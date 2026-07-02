import React, { Component } from 'react';
import ContactItem from './ContactItem/ContactItem';
import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';

export class ContactList extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <>
        <div className={styles.contactMainList}>
          <h2>Contact List</h2>
          <ul className={styles.contactList}>
            {contacts.map((contact) => (
              <ContactItem key={nanoid()} contact={contact} />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default ContactList;
