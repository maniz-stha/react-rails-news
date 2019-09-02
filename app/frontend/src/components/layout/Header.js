import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';
import { submitSearch } from '../../actions/newsAction';
import isEmpty from '../../validatons/isEmpty';

class Header extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: '',
    }
  }

  onChange(event) {
      this.setState({ [event.target.name]: event.target.value })
  }

  //handle logout button click
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  onSearchSubmit(e) {
    e.preventDefault();
    this.props.submitSearch(this.state.searchTerm, this.props.history);
    this.setState({ searchTerm: '' });
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
        <div className="btn-group">
          <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {user.name}
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="/profile">Profile</a>
            <a className="dropdown-item" href="/news/create">Add news</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" onClick={this.onLogoutClick.bind(this)}>Logout</a>
          </div>
        </div>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">React Rails news</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="input-group search-group">
            <form className="search-form" onSubmit={this.onSearchSubmit.bind(this)}>
              <input
                type="text"
                className="form-control"
                placeholder="Search feeds"
                aria-label="Search"
                name="searchTerm"
                aria-describedby="button-addon2" 
                onChange={this.onChange.bind(this)}
                value={this.state.searchTerm}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                  <i className="fas fa-search" />
                </button>
              </div>
            </form>
          </div>
          { authLinks }
        </div>
      </nav>        
    )
  }
}

Header.prototypes = {
  logoutUser: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth
});
export default connect(mapStatesToProps, {logoutUser, submitSearch})(withRouter(Header))