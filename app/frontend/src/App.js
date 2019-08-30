import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header />
          <div className="container page-wrapper">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
