import { useState } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Header from './components/Header/Header';
import { EMPTY_CONTACT } from './model/contact';

import './App.css';

function App() {
  const [selectedContact, setSelectedContact] = useState(EMPTY_CONTACT);
  const [successEditCont, setSuccessEditCont] = useState(false);

  const handleResetForm = () => {
    setSelectedContact({ ...EMPTY_CONTACT });
    setSuccessEditCont(false);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setSuccessEditCont(false);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <ContactList
          onSelectContact={handleSelectContact}
          onResetForm={handleResetForm}
        />
        <ContactForm
          currentContact={selectedContact}
          onResetForm={handleResetForm}
          successEditCont={successEditCont}
          setSuccessEditCont={() => setSuccessEditCont(true)}
        />
      </div>
    </div>
  );
}

export default App;
