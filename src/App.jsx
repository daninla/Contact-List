import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './api/contact-service';
import { saveToLocalStorage } from './localStorage';
import { nanoid } from 'nanoid';
import './App.css';

export const EMPTY_CONTACT = {
  id: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({ ...EMPTY_CONTACT });

  useEffect(() => {
    api.get('/').then(({data}) => {
      if (!data) {
        setContacts([]);
      } else {
        setContacts(data);
      }
    });
  }, []);

  const addContact = (contact) => {
    setContacts((prevContacts) => {
      const newContacts = [...prevContacts, { ...contact, id: nanoid() }];
      saveToLocalStorage(newContacts);
      return newContacts;
    });
  };

  const updateContact = (contact) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.map((item) =>
        item.id === contact.id ? contact : item,
      );
      saveToLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setCurrentContact({ ...EMPTY_CONTACT });
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => {
      const updatedContacts = prevContacts.filter(
        (contact) => contact.id !== id,
      );
      saveToLocalStorage(updatedContacts);
      return updatedContacts;
    });
    setCurrentContact({ ...EMPTY_CONTACT });
  };

  const selectContact = (contact) => {
    setCurrentContact({ ...contact });
  };

  const clearCurrentContact = () => {
    setCurrentContact({ ...EMPTY_CONTACT });
  };

  return (
    <div className="app">
      <header>
        <h1>Contact List</h1>
      </header>
      <div className="app-main">
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          selectContact={selectContact}
        />
        <ContactForm
          currentContact={currentContact}
          saveContact={saveContact}
          deleteContact={deleteContact}
          clearCurrentContact={clearCurrentContact}
        />
      </div>
    </div>
  );
}
export default App;
