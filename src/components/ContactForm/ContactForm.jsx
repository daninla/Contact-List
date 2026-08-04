import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { EMPTY_CONTACT } from '../../model/contact';
import {
  addContact,
  clearCurrentContact,
  editContact,
  removeContact,
} from '../../store/slices/contactsSlice';

import ContactInput from './ContactInput/ContactInput';
import SuccessMessage from './SuccessMessage/SuccessMessage';

import styles from './ContactForm.module.css';

const phoneRegExp = /^[+\d][\d\s-]{6,14}\d$/;

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
});

function ContactForm() {
  const dispatch = useDispatch();

  const currentContact = useSelector(
    (state) => state.contactsList.currentContact,
  );

  const showMessage = useSelector(
    (state) => state.contactsList.successEditCont,
  );

  const initialValues = {
    firstName: currentContact.firstName || '',
    lastName: currentContact.lastName || '',
    phone: currentContact.phone || '',
    email: currentContact.email || '',
  };

  const handleSubmit = (values) => {
    const contact = {
      ...values,
      id: currentContact.id,
    };
    if (!currentContact.id) {
      dispatch(addContact(contact));
      return;
    }
    dispatch(editContact(contact));
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, resetForm }) => (
        <>
          <Form className={styles.formField}>
            <div className={styles.itemContainer}>
              <div className={styles.inputContainer}>
                <ContactInput name="firstName" placeholder="First Name" />
                <ErrorMessage name="firstName" component="div" />
              </div>

              <div className={styles.inputContainer}>
                <ContactInput name="lastName" placeholder="Last Name" />
                <ErrorMessage name="lastName" component="div" />
              </div>

              <div className={styles.inputContainer}>
                <ContactInput name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" component="div" />
              </div>

              <div className={styles.inputContainer}>
                <ContactInput name="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" />
              </div>

              {showMessage && <SuccessMessage />}
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={showMessage || !isValid || !dirty}
              >
                Save
              </button>

              {currentContact.id ? (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => dispatch(removeContact(currentContact.id))}
                >
                  Delete
                </button>
              ) : null}
              <button
                className={styles.newContactButton}
                onClick={() => {
                  resetForm({ values: EMPTY_CONTACT });
                  dispatch(clearCurrentContact());
                }}
                type="button"
              >
                New
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default ContactForm;
