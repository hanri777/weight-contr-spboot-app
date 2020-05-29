import React, { Component } from 'react'
import './MainSectionComponent.css'
import fat from './img/fat-man.png'
import thin from './img/thin-man.png'

import CookieConsent from "react-cookie-consent";

class MainSectionComponent extends Component {

  componentDidMount() {
    
        let wrapper = document.getElementById('wrapper');
        let topLayer = wrapper.querySelector('.top');
        let handle = wrapper.querySelector('.handle');
        let skew = 0;
        let delta = 0;

        if(wrapper.className.indexOf('skewed') !== -1){
            skew = 1000;
        }
        wrapper.addEventListener('mousemove', function(event){
            delta = (event.clientX - window.innerWidth/2)*0.5;
            handle.style.left = event.clientX + delta + 'px';
            topLayer.style.width = event.clientX + skew + delta + 'px';
        }); 
  }

  render() {
    return (
      <div id="main-section" className="main-section-wrap-div">

        <section id="wrapper" className="skewed">
          <div className="layer bottom">
            <div className="content-wrap">
              <div className="content-body">
                <h1>Look Cool</h1>                
                  <p>You are a unique person and you always look 
                    cool with or without ideal BMI :)
                    Unique doesn't mean perfect, unique means 
                    beautiful. Shine and smile  - this is the 
                    key of looking cool. </p>
              </div>
              <img src={thin} alt="This is a thin man" />
            </div>
          </div>

          <div className="layer top">
            <div className="content-wrap">
              <div className="content-body">
                <h1>Don't Stop</h1>
                  <p>Even if the results seems to be not good enough, 
                    sometimes even worse, don't be upset. Try again and 
                    again until your dream is achieved. "You never fail 
                    until you stop trying.” ― Albert Einstein.</p>
              </div>
              <img src={fat} alt="This is a fat man" />
            </div>
          </div>
          <div className="handle"></div>
        </section>

        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>

      </div>
    );
  }    
}

export default MainSectionComponent;
