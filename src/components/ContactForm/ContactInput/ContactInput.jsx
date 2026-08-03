import { useField } from 'formik';

import styles from './ContactInput.module.css';

const ContactInput = ({ ...props }) => {
  const [field, , helpers] = useField(props);

  return (
    <div className={styles.item}>
      <input {...field} {...props} type="text" />

      <span onClick={() => helpers.setValue('')}>X</span>
    </div>
  );
};

export default ContactInput;
