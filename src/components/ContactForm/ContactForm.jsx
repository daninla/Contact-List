import React, { Component } from 'react';
import styles from './ContactForm.module.css';

export class ContactForm extends Component {
  render() {
    const { mode, currentContact } = this.props;
    return (
      <>
        <form className={styles.formField}>
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
              <button type="submit">X</button>
            </div>
            <div className={styles.item}>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
              <button type="submit">X</button>
            </div>
            <div className={styles.item}>
              <input type="text" name="phone" id="phone" placeholder="Phone" />
              <button type="submit">X</button>
            </div>
            <div className={styles.item}>
              <input type="text" name="email" id="email" placeholder="Email" />
              <button type="submit">X</button>
            </div>
          </div>

          <button type="submit">Save</button>
          {mode === true ? null : <button type="submit">Delete</button>}

        </form>
      </>
    );
  }
}

export default ContactForm;
