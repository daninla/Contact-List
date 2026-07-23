import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Contact List</h1>
      </header>
      <div className="app-main">
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;