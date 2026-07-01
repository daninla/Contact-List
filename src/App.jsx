import { Component } from 'react';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

class App extends Component {
  state = {
    contacts: [],
    currentContact: {},
    mode: false,
    inputMode: false,
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
            inputMode={this.state.inputMode}
          />
        </div>
        <button
          className='new-contact-button'
          onClick={() => {
            this.setState({
              currentContact: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
              },
              inputMode: true,
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
