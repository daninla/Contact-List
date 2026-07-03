import React, { Component } from 'react';
import styles from './ContactItem.module.css';

export class ContactItem extends Component {
  render() {
    const { contact, deleteContact, selectContact } = this.props;
    return (
      <>
        <li
          className={styles.contactItem}
          onDoubleClick={() => selectContact(contact)}
        >
          <div style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
            <p>{contact.firstName}</p>
            <p>{contact.lastName}</p>
          </div>
          <span onClick={() => deleteContact(contact.id)}>X</span>
        </li>
      </>
    );
  }
}

export default ContactItem;
