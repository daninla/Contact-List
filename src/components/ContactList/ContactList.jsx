import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import api from '../../api/contact-service';
import {
  deleteContactAction,
  fetchContactsAction,
  selectContact,
} from '../../store/actions/contactActions';

import ContactItem from './ContactItem/ContactItem';

import styles from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const fetchPromise = api.get('/');
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchPromise, delayPromise])
      .then(([{ data }]) => {
        dispatch(fetchContactsAction(data));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const deleteContact = (id) => {
      dispatch(deleteContactAction(id));
  };

  const handleSelectContact = (contact) => {
    dispatch(selectContact(contact));
  };

  return (
    <div className={styles.contactMainList}>
      <h2>Contact List</h2>
      {isLoading ? (
        <ClipLoader />
      ) : contacts.length == 0 ? (
        'Пусто'
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
