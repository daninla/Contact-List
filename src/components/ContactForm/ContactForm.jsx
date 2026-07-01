import React, { Component } from 'react';
import styles from './ContactForm.module.css';

export class ContactForm extends Component {
  render() {
    const { mode, currentContact, inputMode } = this.props;

    return (
      <>
        <form className={styles.formField}>
          <fieldset disabled={!inputMode} style={{ border: 'none', padding: 0, margin: 0 }}>
            <div className={styles.itemContainer}>
              <div className={styles.item}>
                <input
                  value={currentContact.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                />
                <button type="submit">X</button>
              </div>
              <div className={styles.item}>
                <input
                  value={currentContact.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                />
                <button type="submit">X</button>
              </div>
              <div className={styles.item}>
                <input
                  value={currentContact.phone}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                />
                <button type="submit">X</button>
              </div>
              <div className={styles.item}>
                <input
                  value={currentContact.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
                <button type="submit">X</button>
              </div>
            </div>

            <button className={styles.saveButton} type="submit">
              Save
            </button>
            {mode === true ? null : (
              <button className={styles.deleteButton} type="submit">
                Delete
              </button>
            )}
          </fieldset>
        </form>
      </>
    );
  }
}

export default ContactForm;