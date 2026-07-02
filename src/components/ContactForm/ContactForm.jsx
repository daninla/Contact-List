import React, { Component } from 'react';
import styles from './ContactForm.module.css';
import ContactInput from './ContactInput/ContactInput'

export class ContactForm extends Component {
  clickByDelete = () => {
    this.props.deleteContact(this.props.currentContact.id);
  };

  render() {
    const {
      mode,
      currentContact,
      changeInputValue,
      saveContact,
      deleteContact,
    } = this.props;

    return (
      <>
        <form className={styles.formField} onSubmit={saveContact}>
          <div className={styles.itemContainer}>
            <ContactInput
              changeInputValue={changeInputValue}
              value={currentContact.firstName}
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <ContactInput
              changeInputValue={changeInputValue}
              value={currentContact.lastName}
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
            <ContactInput
              changeInputValue={changeInputValue}
              value={currentContact.phone}
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
            <ContactInput
              changeInputValue={changeInputValue}
              value={currentContact.email}
              name="email"
              id="email"
              placeholder="Email Address"
            />
          </div>
          <div
            style={{
              width: '100%',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button className={styles.saveButton} type="submit">
              Save
            </button>
            {mode === 'add' ? null : (
              <button
                className={styles.deleteButton}
                onClick={this.clickByDelete}
                type="submit"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </>
    );
  }
}
export default ContactForm;
