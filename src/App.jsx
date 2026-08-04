import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Header from './components/Header/Header';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-main">
        <ContactList />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;
