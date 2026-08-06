import ClipLoader from '@/components/UI/ClipLoader/ClipLoader';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '@/features/contacts/api/contactsApi';

import ContactItem from '../ContactItem/ContactItem';

import styles from './ContactList.module.css';

function ContactList({ onSelectContact, onResetForm }) {
  const { data: contacts = [], isLoading } = useGetContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  const handleRemoveContact = async (id) => {
    await deleteContact(id);
    onResetForm();
  };

  return (
    <div className={styles.contactMainList}>
      {isLoading ? (
        <ClipLoader />
      ) : contacts.length === 0 ? (
        'Пусто'
      ) : (
        <ul className={styles.contactList}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              deleteContact={handleRemoveContact}
              selectContact={onSelectContact}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
