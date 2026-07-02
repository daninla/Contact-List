import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import { saveToLocalStorage } from './localStorage';
import { nanoid } from 'nanoid';
import './App.css';

const EMPTY_CONTACT = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

class App extends Component {
  state = {
    contacts: [],
    currentContact: { ...EMPTY_CONTACT },
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

  saveContactAdd = (currentContact, contacts) => {
    const updatedContacts = [...contacts, { ...currentContact, id: nanoid() }];

    this.setState({
      contacts: updatedContacts,
      currentContact: { ...EMPTY_CONTACT },
    });

    saveToLocalStorage(updatedContacts);
  };

  saveContactEdit = (currentContact, contacts) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === currentContact.id ? currentContact : contact,
    );
    this.setState({
      contacts: updatedContacts,
      currentContact: { ...EMPTY_CONTACT },
      mode: 'add',
    });
    saveToLocalStorage(updatedContacts);
  };

  saveContact = (event) => {
    event.preventDefault();
    const { contacts, currentContact, mode } = this.state;
    if (mode === 'add') {
      this.saveContactAdd(currentContact, contacts);
    } else if (mode === 'edit') {
      this.saveContactEdit(currentContact, contacts);
    }
  };

  editContact = (contact) => {
    this.setState({
      currentContact: { ...contact },
      mode: 'edit',
    });
  };

  deleteContact = (id) => {
    const updatedContacts = this.state.contacts.filter(
      (contact) => contact.id !== id,
    );

    this.setState({
      contacts: updatedContacts,
    });
    saveToLocalStorage(updatedContacts);
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
            deleteContact={this.deleteContact}
            editContact={this.editContact}
          />
          <ContactForm
            mode={this.state.mode}
            currentContact={this.state.currentContact}
            changeInputValue={this.changeInputValue}
            saveContact={this.saveContact}
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
