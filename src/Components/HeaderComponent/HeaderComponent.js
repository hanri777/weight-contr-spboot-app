import React, { Component } from "react";
import { Link } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";
import "./HeaderComponent.css";
import AuthenticationService from '../AuthenticationComponents/AuthenticationService'

class HeaderComponents extends Component {
  render() {
    const isUserSignedIn = AuthenticationService.isUserSignedIn();

    // if(window.location.pathname === '/sign-in') return null;
    return (
      <header className="header">

        <div className="logo-div">
          <p>Count&Burn</p>
        </div>

        <nav className="navbar">
          <ul>
            <li>
              <Link
                activeClass="active"
                to="main-section"
                spy={true}
                smooth={true}
                offset={0}
                duration={800}
              >
                Main
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="calctrack-section"
                spy={true}
                smooth={true}
                offset={0}
                duration={800}
              >
                Calculate
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="diet-section"
                spy={true}
                smooth={true}
                offset={0}
                duration={800}
              >
                Recipe
              </Link>
            </li>
            <li>
              <LinkRouter to="/contact">
                Contact
              </LinkRouter>
            </li>
            {
              isUserSignedIn
              &&
                <li>
                  {/* <LinkRouter to={`/track/${AuthenticationService.getEmail()}`}> */}
                  <LinkRouter to={`/track/:${AuthenticationService.getEmail()}`}>
                    Track
                  </LinkRouter>
                </li>
            }
          </ul>
        </nav>

        <div className="signin-div">
          {
            isUserSignedIn
            ?
              <LinkRouter to="/" onClick={AuthenticationService.signout}>Sign Out</LinkRouter>             
            :
              <LinkRouter to="/sign-in">Sign In</LinkRouter>
          }
        </div>

      </header>
    );
  }
}

export default HeaderComponents;
