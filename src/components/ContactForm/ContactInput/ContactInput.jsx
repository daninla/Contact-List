import React, { Component } from 'react';
import styles from './ContactInput.module.css'

export class ContactInput extends Component {
  setTextfromInput = (event) => {
    this.props.changeInputValue(event.target.value, event.target.name);
  };

  render() {
    const { value, name, id, placeholder, changeInputValue } = this.props;
    return (
      <div className={styles.item}>
        <input
          onChange={this.setTextfromInput}
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
