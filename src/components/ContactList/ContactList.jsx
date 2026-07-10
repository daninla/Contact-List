import ContactItem from './ContactItem/ContactItem';
import styles from './ContactList.module.css';

function ContactList({ contacts, deleteContact, selectContact }) {
  return (
    <>
      <div className={styles.contactMainList}>
        <h2>Contact List</h2>
        <ul className={styles.contactList}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
              selectContact={selectContact}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default ContactList;
