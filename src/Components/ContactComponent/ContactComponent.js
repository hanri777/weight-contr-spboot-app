import React, { Component } from 'react'
import HeaderMiniComponents from '../HeaderMiniComponent/HeaderMiniComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import './ContactComponent.css'

class ContactComponent extends Component {
  render() {
    return (
      <div className="mainDivContact">
          <HeaderMiniComponents />
          <div className="contDiv">
            <div className="contTitleDiv">
              <h1>Contacts</h1>
            </div>
          
            <div className="contactContent">

              <h3>Hanri Alikhanyan</h3>
              <h3>fjhanri@gmail.com</h3>

            </div>
          </div>
        <FooterComponent />
      </div>
    )
  }
}

export default ContactComponent
