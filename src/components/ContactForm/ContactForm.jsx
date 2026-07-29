import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EMPTY_CONTACT } from '../../model/contact';
import {
  addContact,
  clearCurrentContact,
  editContact,
  removeContact,
} from '../../store/slices/contactsSlice';

import ContactInput from './ContactInput/ContactInput';

import styles from './ContactForm.module.css';

function ContactForm() {
  const currentContact = useSelector((state) => state.contactsList.currentContact);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({ ...currentContact });

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValues({ ...currentContact });
  }, [currentContact]);

  const changeInputValue = (value, nameInput) => {
    setInputValues((prev) => ({ ...prev, [nameInput]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentContact.id) {
      dispatch(addContact(inputValues));
      setInputValues({ ...EMPTY_CONTACT });
    } else {
      dispatch(editContact(inputValues));
    }
  };

  const clickByDelete = (e) => {
    e.preventDefault();
    dispatch(removeContact(currentContact.id));
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
              type="button"
            >
              Delete
            </button>
          )}
        </div>
      </form>
      <button
        className="new-contact-button"
        onClick={() => dispatch(clearCurrentContact())}
      >
        New
      </button>
    </>
  );
}

export default ContactForm;
