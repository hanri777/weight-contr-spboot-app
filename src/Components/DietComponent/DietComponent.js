import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ImgComponent from './ImgComponent'
import './DietComponent.css'
import i1 from './img/borsh.jpg'
import i2 from './img/frukti.jpg'
//import i3 from './img/grudinka.jpg'
import i4 from './img/ovoshchi.jpg'
import i5 from './img/salat.jpg'

// class DietComponent extends Component {
  function DietComponent(props) {
//  render() {

    let sliderArr = [ 
      <ImgComponent src={i1} />, 
      <ImgComponent src={i2} />, 
      // <ImgComponent src={i3} />, 
      <ImgComponent src={i4} />, 
      <ImgComponent src={i5} />
    ]

    const [x, setX] = useState(0)

    const goLeft = () => {
      x === 0 ? setX(-100*(sliderArr.length -1)) : setX(x + 100)   
    }

    const goRight = () => {
      x=== -100*(sliderArr.length -1) ? setX(0) : setX(x - 100)      
    }

    var startSl = null

    function stopSlide() {
      clearTimeout(startSl)
    }

    function startSlide() {
      //startSl = setTimeout(goRight, 2000)
      startSl = setTimeout(() => {
        x=== -100*(sliderArr.length -1) ? setX(0) : setX(x - 100)      
      }, 2000)
    }
    
    //startSlide()

    

    return (
      <div id="diet-section" className="diet-section-class">

      
        <div 
          className="slider" 
          onMouseOver={stopSlide} 
          onMouseOut={startSlide}
          onMouseMove={stopSlide}                    
        >
          {
            sliderArr.map(
              (item, index) => {
                return(
                  <div
                    key={index} 
                    className="slide" 
                    style={{ transform: `translateX(${x}%)` }}>
                    {item}
                  </div>
                )
              }
            )
          }
          <button id="goLeft" onClick={goLeft} ></button>
          <button id="goRight" onClick={goRight} ></button>  

          <button 
            className="toRecipeBtn" 
            onClick={()=>props.history.push("/recipe")}
          >
            Recipes
          </button>     
        </div>

      </div>
    )
//  }
 }

export default withRouter(DietComponent)
// export default DietComponent
