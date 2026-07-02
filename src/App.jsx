import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
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

  saveContact = () => {
    const { contacts, currentContact, mode } = this.state;

    if (
      currentContact.firstName === '' ||
      currentContact.lastName === '' ||
      currentContact.phone === '' ||
      currentContact.email === ''
    ) {
      return;
    }

    if (mode === 'add') {
      this.setState(
        {
          contacts: [...contacts, currentContact],
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

  render() {
    return (
      <div className="app">
        <header>
          <h1>Contact List</h1>
        </header>
        <div className="app-main">
          <ContactList contacts={this.state.contacts} />
          <ContactForm
            mode={this.state.mode}
            currentContact={this.state.currentContact}
            inputMode={this.state.inputMode}
            changeInputValue={this.changeInputValue}
            saveContact={this.saveContact}
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
