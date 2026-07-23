import styles from './ContactInput.module.css';

const ContactInput = ({ value, name, id, placeholder, changeInputValue }) => {
  return (
    <div className={styles.item}>
      <input
        onChange={(event) =>
          changeInputValue(event.target.value, event.target.name)
        }
        value={value}
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <span onClick={() => changeInputValue('', name)}>X</span>
    </div>
  );
};
export default ContactInput;
