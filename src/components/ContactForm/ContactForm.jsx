import React, { Component } from 'react';
import styles from './ContactForm.module.css';

export class InputComponent extends Component {
  setTextfromInput = (event) => {
    this.props.changeInputValue(event.target.value, event.target.name);
  };

  render() {
    const { value, name, id, placeholder, changeInputValue } = this.props;
    return (
      <div className={styles.item}>
        <input
          onChange={this.setTextfromInput}
          value={value}
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
        />
        <span onClick={() => this.props.changeInputValue('', this.props.name)}>
          X
        </span>
      </div>
    );
  }
}

export class ContactForm extends Component {
  render() {
    const { mode, currentContact, inputMode, changeInputValue, saveContact } =
      this.props;
    return (
      <>
        <form className={styles.formField}>
          <div className={styles.itemContainer}>
            <InputComponent
              changeInputValue={changeInputValue}
              value={currentContact.firstName}
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <InputComponent
              changeInputValue={changeInputValue}
              value={currentContact.lastName}
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
            <InputComponent
              changeInputValue={changeInputValue}
              value={currentContact.phone}
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
            <InputComponent
              changeInputValue={changeInputValue}
              value={currentContact.email}
              name="email"
              id="email"
              placeholder="Email Address"
            />
          </div>
          <div style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={saveContact}
              className={styles.saveButton}
              type="submit"
            >
              Save
            </button>
            {mode === 'add' ? null : (
              <button className={styles.deleteButton} type="submit">
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
