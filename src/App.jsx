import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    currentContact: {},
    mode: true,
  };

  componentDidMount() {
    contactsLocal = JSON.parse(localStorage.getItem('contacts'));
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

  render() {
    return (
      <>
        <header>
          <h1>Contact List</h1>
        </header>
        <ContactList contacts={contacts} />
        <ContactForm mode={mode} currentContact={currentContact} />
      </>
    );
  }
}

export default App;
