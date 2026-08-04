import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

import {
  fetchContacts,
  removeContact,
  selectContact,
} from '../../store/slices/contactsSlice';

import ContactItem from './ContactItem/ContactItem';

import styles from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector((state) => state.contactsList.contacts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const timer = setTimeout(async () => {
      await dispatch(fetchContacts());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const deleteContact = (id) => {
    dispatch(removeContact(id));
  };

  const handleSelectContact = (contact) => {
    dispatch(selectContact(contact));
  };

  return (
    <div className={styles.contactMainList}>
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
