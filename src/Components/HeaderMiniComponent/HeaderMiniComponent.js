import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HeaderMiniComponent.css";
import AuthenticationService from '../AuthenticationComponents/AuthenticationService'

class HeaderComponents extends Component {
  render() {
    // if(window.location.pathname === '/sign-in') return null;
    return (
      <header className="header">

        <div className="logo-div">
          <p>Count&Burn</p>
        </div>

        <nav className="navbar">
          <ul>
            <li>
                <Link to="/">               
                    Main
                </Link>
            </li>            
            <li>
                <Link to="/contact">               
                    Contact
                </Link>                           
            </li>
          </ul>
        </nav>

        <div className="signin-div">
          <Link to="/" onClick={AuthenticationService.signout}>Sign Out</Link>
        </div>

      </header>
    );
  }
}

export default HeaderComponents;
