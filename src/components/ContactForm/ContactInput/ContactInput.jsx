import React, { Component } from 'react';
import styles from './ContactInput.module.css';

export class ContactInput extends Component {
  render() {
    const { value, name, id, placeholder, changeInputValue } = this.props;
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
        <span onClick={() => this.props.changeInputValue('', this.props.name)}>
          X
        </span>
      </div>
    );
  }
}
export default ContactInput;
