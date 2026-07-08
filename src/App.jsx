import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import api from './api/contact-service';
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
    api.get('/').then(({ data }) => {
      if (!data) {
        setContacts([]);
      } else {
        setContacts(data);
      }
    });
  }, []);

  const addContact = (contact) => {
    api.post('/', contact).then(({ data }) => {
      setContacts((prevContacts) => {
        return [...prevContacts, data];
      });
    });
  };

  const updateContact = (contact) => {
    api.put(`/${contact.id}`, contact).then(({ data }) => {
      setContacts(contacts.map((c) => (c.id === data.id ? data : c)));
      clearCurrentContact();
    });
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
  };

  const deleteContact = (id) => {
    api.delete(`/${id}`).then(({ data }) => {
      setContacts(contacts.filter((item) => item.id !== data.id));
      clearCurrentContact();
    });
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
