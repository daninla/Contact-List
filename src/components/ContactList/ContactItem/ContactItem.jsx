import styles from './ContactItem.module.css';

function ContactItem({ contact, deleteContact, selectContact }) {
  const setDoubleClick = () => {
    selectContact(contact);
  };
  return (
    <>
      <li className={styles.contactItem} onDoubleClick={setDoubleClick}>
        <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
          <p>{contact.firstName}</p>
          <p>{contact.lastName}</p>
        </div>
        <span onClick={() => deleteContact(contact.id)}>X</span>
      </li>
    </>
  );
}
export default ContactItem;
