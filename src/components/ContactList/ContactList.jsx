import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from './ContactItem/ContactItem';
import api from '../../api/contact-service';
import {
  fetchContactsSuccess,
  deleteContactSuccess,
  selectContact,
} from '../../store/actions/contactActions';
import styles from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/').then(({ data }) => {
      dispatch(fetchContactsSuccess(data || []));
    });
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
    </div>
  );
}

export default ContactList;
