import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
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
              <ul className="navbar-nav mx-10">
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              </ul>
            </div>
          </nav>        
        )
        }
    }
    
export default Header;