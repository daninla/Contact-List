import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from './ContactItem/ContactItem';
import api from '../../api/contact-service';
import {
  fetchContactsSuccess,
  deleteContactSuccess,
  selectContact,
} from '../../store/actions/contactActions';
import styles from './ContactList.module.css';
import { ClipLoader } from 'react-spinners';

function ContactList() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchPromise = api.get('/');
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchPromise, delayPromise])
      .then(([{ data }]) => {
        dispatch(fetchContactsSuccess(data || []));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const deleteContact = (id) => {
    api.delete(`/${id}`).then(({ data }) => {
      dispatch(deleteContactSuccess(data.id));
    });
  };

  const handleSelectContact = (contact) => {
    dispatch(selectContact(contact));
  };

  return (
    <div className={styles.contactMainList}>
      <h2>Contact List</h2>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <ul className={styles.contactList}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
              selectContact={handleSelectContact}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;