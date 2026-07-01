import React, { Component } from 'react';

export class ContactItem extends Component {
  render() {
    const { contact } = this.props;
    return (
      <>
        <li className="contact-item">
          <p className="contact-item">{contact.firstName}</p>
          <p className="contact-item">{contact.lastName}</p>
          <p className="contact-item">{contact.phone}</p>
          <p className="contact-item">{contact.email}</p>
        </li>
      </>
    );
  }
}

export default ContactItem;
