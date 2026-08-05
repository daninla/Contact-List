import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Form, Formik } from 'formik';

import {
  addContact,
  clearCurrentContact,
  editContact,
  removeContact,
} from '../../store/slices/contactsSlice';
import { contactValidationSchema } from '../../utils/validationShemas';

import ContactInput from './ContactInput/ContactInput';
import SuccessMessage from './SuccessMessage/SuccessMessage';

import styles from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();

  const currentContact = useSelector(
    (state) => state.contactsList.currentContact,
  );

  const showMessage = useSelector(
    (state) => state.contactsList.successEditCont,
  );

  const initialValues = { ...(currentContact || '') };

  const handleSubmit = (values) => {
    if (!currentContact.id) {
      dispatch(addContact(values));
    } else {
      dispatch(editContact(values));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={contactValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
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
                <ContactInput name="phone" placeholder="+380 (67) 123-4567" />
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
