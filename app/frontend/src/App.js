import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import Login from './components/auth/Login'
import Register from './components/auth/Register'

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
