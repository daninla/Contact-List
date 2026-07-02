import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    currentContact: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    mode: 'add',
    errorMessage: '',
  };

  componentDidMount() {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'));
    if (!contactsLocal) {
      this.setState({
        contacts: [],
      });
    } else {
      this.setState({
        contacts: [...contactsLocal],
      });
    }
  }

  changeInputValue = (value, nameInput) => {
    this.setState({
      currentContact: { ...this.state.currentContact, [nameInput]: value },
    });
  };

  validateContact = (contact) => {
    const { firstName, lastName, phone, email } = contact;
    if (!firstName || !lastName || !phone || !email) {
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }
    return true;
  };

  saveContact = (event) => {
    event.preventDefault();
    const { contacts, currentContact, mode } = this.state;
    if (!this.validateContact(currentContact)) {
      this.setState({ errorMessage: 'Данные заполнены некорректно' });
      return;
    }
    if (
      currentContact.firstName === '' ||
      currentContact.lastName === '' ||
      currentContact.phone === '' ||
      currentContact.email === ''
    ) {
      return;
    }

    this.setState({ errorMessage: '' });
    if (mode === 'add') {
      const newContact = { ...currentContact, id: nanoid() };
      this.setState(
        {
          contacts: [...contacts, newContact],
          currentContact: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
          },
        },
        () => {
          localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        },
      );
    } else if (mode === 'edit') {
      const updatedContacts = contacts.map((contact) =>
        contact.id === currentContact.id ? currentContact : contact,
      );
      this.setState(
        {
          contacts: updatedContacts,
          currentContact: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
          },
          mode: 'add',
        },
        () => {
          localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        },
      );
    }
  };

  editContact = (contact) => {
    this.setState({
      currentContact: contact,
      mode: 'edit',
    });
  };

  deleteContact = (id) => {
    this.setState(
      {
        contacts: this.state.contacts.filter((contact) => contact.id !== id),
      },
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      },
    );
  };

  render() {
    return (
      <div className="app">
        <header>
          <h1>Contact List</h1>
        </header>
        <div className="app-main">
          <ContactList
            contacts={this.state.contacts}
            editContact={this.editContact}
            deleteContact={this.deleteContact}
          />
          <ContactForm
            mode={this.state.mode}
            currentContact={this.state.currentContact}
            inputMode={this.state.inputMode}
            changeInputValue={this.changeInputValue}
            saveContact={this.saveContact}
            errorMessage={this.state.errorMessage}
            deleteContact={this.deleteContact}
          />
        </div>
        <button
          className="new-contact-button"
          onClick={() => {
            this.setState({
              currentContact: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
              },
              inputMode: true,
              mode: 'add',
              errorMessage: '',
            });
          }}
        >
          New
        </button>
      </div>
    );
  }
}

export default App;
