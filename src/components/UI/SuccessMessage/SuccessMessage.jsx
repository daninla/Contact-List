import styles from './SuccessMessage.module.css';

function SuccessMessage() {
  return (
    <div className={styles.successMessage}>
      <span className={styles.icon}>✓</span>
      <span>Contact updated successfully</span>
    </div>
  );
}

export default SuccessMessage;
