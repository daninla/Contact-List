import React, { Component } from 'react';
import styles from './ContactForm.module.css';
import ContactInput from './ContactInput/ContactInput';

export class ContactForm extends Component {
  state = {
    ...this.props.currentContact,
  };


  clickByDelete = () => {
    this.props.deleteContact(this.props.currentContact.id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentContact !== prevState.prevContact) {
      return {
        ...nextProps.currentContact,
        prevContact: nextProps.currentContact,
      };
    }

    return null;
  }

  changeInputValue = (value, nameInput) => {
    this.setState({
      [nameInput]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveContact(this.state);
  };

  render() {
    const { mode, currentContact, saveContact, deleteContact } = this.props;
    const { firstName, lastName, phone, email } = this.state;

    return (
      <>
        <form className={styles.formField} onSubmit={this.handleSubmit}>
          <div className={styles.itemContainer}>
            <ContactInput
              changeInputValue={this.changeInputValue}
              value={firstName}
              name="firstName"
              id="firstName"
              placeholder="First Name"
            />
            <ContactInput
              changeInputValue={this.changeInputValue}
              value={lastName}
              name="lastName"
              id="lastName"
              placeholder="Last Name"
            />
            <ContactInput
              changeInputValue={this.changeInputValue}
              value={phone}
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
            <ContactInput
              changeInputValue={this.changeInputValue}
              value={email}
              name="email"
              id="email"
              placeholder="Email Address"
            />
          </div>
          <div
            style={{
              width: '100%',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button className={styles.saveButton} type="submit">
              Save
            </button>
            {!this.props.currentContact.id ? null : (
              <button
                className={styles.deleteButton}
                onClick={this.clickByDelete}
                type="submit"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </>
    );
  }
}
export default ContactForm;
