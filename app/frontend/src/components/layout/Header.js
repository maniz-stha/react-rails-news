import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import isEmpty from '../../validatons/isEmpty';

class Header extends Component {
  //handle logout button click
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const user = !isEmpty(this.props.auth.user) ? this.props.auth.user : null;
    let authLinks;
    if (!isAuthenticated) {
      authLinks = (
        <ul className="navbar-nav mx-10">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      );
    } else {
      authLinks = (
        <ul className="navbar-nav mx-10">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">{user.name}</Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={this.onLogoutClick.bind(this)}>Logout</a>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">React Rails news</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="input-group mx-10">
            <input type="text" className="form-control" placeholder="Search feeds" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i className="fas fa-search"/></button>
            </div>
          </div>
          { authLinks }
        </div>
      </nav>        
    )
  }
}

Header.prototypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth
});
export default connect(mapStatesToProps, {logoutUser})(Header)