import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Routes from '../main/Routes';

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <header>
          <Header/>
        </header>
        <section>
          <Routes/>
        </section>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
