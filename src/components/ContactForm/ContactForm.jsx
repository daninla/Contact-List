import { ErrorMessage, Form, Formik } from 'formik';

import { EMPTY_CONTACT } from '../../model/contact';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} from '../../store/services/contactsApi';
import { contactValidationSchema } from '../../utils/validationShemas';

import ContactInput from './ContactInput/ContactInput';
import SuccessMessage from './SuccessMessage/SuccessMessage';

import styles from './ContactForm.module.css';

function ContactForm({
  currentContact,
  successEditCont,
  setSuccessEditCont,
  onResetForm,
}) {
  const initialValues = currentContact || EMPTY_CONTACT;
  const [addContact] = useAddContactMutation();
  const [editContact] = useEditContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const handleSubmit = async (values) => {
    if (!currentContact.id) {
      await addContact(values);
      onResetForm();
    } else {
      await editContact(values);
      setSuccessEditCont();
    }
  };
  const clickByDelete = async () => {
    await deleteContact(currentContact.id);
    onResetForm();
  };
  const clickByNew = () => {
    onResetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={contactValidationSchema}
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
                <ContactInput name="phone" placeholder="+380 (67) 123-4567" />
                <ErrorMessage name="phone" component="div" />
              </div>

              <div className={styles.inputContainer}>
                <ContactInput name="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" />
              </div>

              {successEditCont && <SuccessMessage />}
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={successEditCont || !isValid || !dirty}
              >
                Save
              </button>

              {currentContact.id ? (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={clickByDelete}
                >
                  Delete
                </button>
              ) : null}
              <button
                className={styles.newContactButton}
                onClick={() => {
                  clickByNew();
                  resetForm();
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
