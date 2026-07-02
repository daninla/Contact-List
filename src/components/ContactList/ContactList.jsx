import React, { Component } from 'react';
import ContactItem from './ContactItem/ContactItem';
import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    const { contacts, editContact } = this.props;
    return (
      <>
        <div className={styles.contactMainList}>
          <h2>Contact List</h2>
          <ul className={styles.contactList}>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id ?? nanoid()}
                contact={contact}
                editContact={editContact}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default ContactList;
