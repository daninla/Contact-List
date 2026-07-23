import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ContactForm.module.css';
import api from '../../api/contact-service';
import { EMPTY_CONTACT } from '../../model/contact';
import {
  addContactSuccess,
  updateContactSuccess,
  deleteContactSuccess,
  clearCurrentContact,
} from '../../store/actions/contactActions';
import ContactInput from './ContactInput/ContactInput';

function ContactForm() {
  const currentContact = useSelector((state) => state.contacts.currentContact);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({ ...currentContact });

  useEffect(() => {
    setInputValues({ ...currentContact });
  }, [currentContact]);

  const changeInputValue = (value, nameInput) => {
    setInputValues((prev) => ({ ...prev, [nameInput]: value }));
  };

  const addContact = (contact) => {
    api.post('/', contact).then(({ data }) => {
      dispatch(addContactSuccess(data));
    });
  };

  const updateContact = (contact) => {
    api.put(`/${contact.id}`, contact).then(({ data }) => {
      dispatch(updateContactSuccess(data));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentContact.id) {
      addContact(inputValues);
      setInputValues({ ...EMPTY_CONTACT });
    } else {
      updateContact(inputValues);
    }
  };

  const clickByDelete = (e) => {
    e.preventDefault();
    api.delete(`/${currentContact.id}`).then(({ data }) => {
      dispatch(deleteContactSuccess(data.id));
    });
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
