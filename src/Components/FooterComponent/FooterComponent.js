import React, { Component } from 'react'
import './FooterComponent.css'


export class FooterComponent extends Component {
  render() {
    // if(window.location.pathname === '/sign-in') return null;
    return (
      <footer className="footer">
          <p className="footer-text">
            All right reserved &copy;2020 Weight Calculator
          </p>
      </footer>
    )
  }
}

export default FooterComponent
