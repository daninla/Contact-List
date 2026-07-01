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
          />
        </div>
      </div>
    );
  }
}

export default App;
