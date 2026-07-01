import React, { Component } from 'react';
import ContactItem from './ContactItem/ContactItem';
import { nanoid } from 'nanoid';

export class ContactList extends Component {
  render() {
    const { contacts } = this.props;
    return (
      <>
        <div className="contact-list">
          <h2>Contact List</h2>
          <ul>
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
