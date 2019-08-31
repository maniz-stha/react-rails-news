import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Feeds from './components/news/Feeds';
import AddNews from './components/news/AddNews';

//check for auth tokens
if (localStorage.jwtToken) {
  //set authorization token in request header
  setAuthToken(localStorage.jwtToken);
  //decode jwt token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Header />
          <div className="container page-wrapper">
            <Route exact path="/(|feeds)/" component={Feeds} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/news/create" component={AddNews}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
