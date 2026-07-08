import React, { useState, useEffect } from 'react';
import styles from './ContactForm.module.css';
import { EMPTY_CONTACT } from '../../App';
import ContactInput from './ContactInput/ContactInput';

function ContactForm({
  currentContact,
  saveContact,
  deleteContact,
  clearCurrentContact,
}) {
  const [inputValues, setInputValues] = useState({
    ...currentContact,
  });

  const clickByDelete = () => {
    deleteContact(currentContact.id);
  };

  useEffect(() => {
    setInputValues({ ...currentContact });
  }, [currentContact]);

  const changeInputValue = (value, nameInput) => {
    setInputValues((prev) => ({
      ...prev,
      [nameInput]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContact(inputValues);
    if (!inputValues.id) {
      setInputValues({
        ...EMPTY_CONTACT,
      });
    }
  };
  const { firstName, lastName, phone, email } = inputValues;

  return (
    <>
      <form className={styles.formField} onSubmit={handleSubmit}>
        <div className={styles.itemContainer}>
          <ContactInput
            changeInputValue={changeInputValue}
            value={firstName}
            name="firstName"
            id="firstName"
            placeholder="First Name"
          />
          <ContactInput
            changeInputValue={changeInputValue}
            value={lastName}
            name="lastName"
            id="lastName"
            placeholder="Last Name"
          />
          <ContactInput
            changeInputValue={changeInputValue}
            value={phone}
            name="phone"
            id="phone"
            placeholder="Phone Number"
          />
          <ContactInput
            changeInputValue={changeInputValue}
            value={email}
            name="email"
            id="email"
            placeholder="Email Address"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton}>Save</button>
          {!currentContact.id ? null : (
            <button
              className={styles.deleteButton}
              onClick={clickByDelete}
              type="submit"
            >
              Delete
            </button>
          )}
        </div>
      </form>
      <button
        className="new-contact-button"
        onClick={() => {
          clearCurrentContact();
        }}
      >
        New
      </button>
    </>
  );
}
export default ContactForm;
