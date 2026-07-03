import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import { saveToLocalStorage } from './localStorage';
import { nanoid } from 'nanoid';
import './App.css';

const EMPTY_CONTACT = {
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

class App extends Component {
  state = {
    contacts: [],
    currentContact: { ...EMPTY_CONTACT },
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

  addContact = (contact) => {
    this.setState((state) => {
      const newContacts = [...state.contacts, { ...contact, id: nanoid() }];
      saveToLocalStorage(newContacts);
      return {
        contacts: newContacts,
        currentContact: { ...EMPTY_CONTACT },
      };
    });
  };

  updateContact = (contact) => {
    this.setState((state) => {
      const updatedContacts = state.contacts.map((item) =>
        item.id === contact.id ? contact : item,
      );
      saveToLocalStorage(updatedContacts);
      return {
        contacts: updatedContacts,
        currentContact: { ...EMPTY_CONTACT },
      };
    });
  };

  saveContact = (contact) => {
    if (!contact.id) {
      this.addContact(contact);
    } else {
      this.updateContact(contact);
    }
  };

  deleteContact = (id) => {
    this.setState((state) => {
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== id,
      );
      saveToLocalStorage(updatedContacts);
      return {
        contacts: updatedContacts,
        currentContact: { ...EMPTY_CONTACT },
      };
    });
  };

  selectContact = (contact) => {
    this.setState({
      currentContact: { ...contact },
    });
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
            selectContact={this.selectContact}
          />
          <ContactForm
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
              currentContact: { ...EMPTY_CONTACT },
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
