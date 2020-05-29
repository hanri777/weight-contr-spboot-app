import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Parallax } from 'react-parallax'
import ScrollAnimation from 'react-animate-on-scroll'
import "animate.css/animate.min.css"
import './CalcTrackComponent.css'
import AuthenticationService from '../AuthenticationComponents/AuthenticationService'
import { Formik, Form, Field, ErrorMessage } from 'formik'

class CalcTrackComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      age: '',
      weight: '',
      height: '',
      gender: '',

      bmi: '',
      bmiStr: '',
      ideal: ''
    }

    //this.calkClicked = this.calkClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.getBmi = this.getBmi.bind(this)
  }

  validate(values) {
    console.log(values)

    let errors = {}

    if (!values.age) {
      errors.age = 'Age is Required'
    }else if(isNaN(values.age) || values.age <= 10 || values.age > 110) {
      errors.age = 'Enter number from 10 to 110'
    }

    if (!values.weight) {
      errors.weight = 'Weight is Required'
    } else if(isNaN(values.weight) || values.weight <= 10 || values.weight > 400) {
      errors.weight = 'Enter number from 10 to 400'
    }

    if (!values.height) {
      errors.height = 'Height is Required'
    }else if(isNaN(values.height) || values.height <= 10 || values.height > 300) {
      errors.height = 'Enter number from 10 to 300'
    }

    if (!values.gender) {
      errors.gender = 'Gender is Required'
    }

    return errors
  }

  onSubmit(values) {

    let gend =
      values.gender === "female"
      ?
      Math.round((values.height - 110)*1.15) 
      + " kg"
      :
      values.gender === "male"
      ?
      Math.round((values.height - 100)*1.15) 
      + " kg"
      :
      null

    this.setState({
      age: values.age,
      weight: values.weight,
      height: values.height,
      gender: values.gender,

      bmi: Math.round(
        values.weight/
        ((values.height/100)*(values.height/100))
      ),
      ideal: gend
    })
    //console.log("Calculation (submit) button was cklicked");
  }

  getBmi(bmi) {
    if(bmi < 18.5) {
        return "Underweight";
    }
    if(bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    }
    if(bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    }
    if(bmi >= 30) {
        return "Obesity";
    }
}

  // calkClicked(e) {
  //   e.preventDefault();

  //   this.setState({
  //     age: e.target.age,
  //     weight: e.target.weight,
  //     height: e.target.height
  //   })

  //   console.log("Calculation button was cklicked");
  // }
  

  render() {
    const isUserSignedIn = AuthenticationService.isUserSignedIn();

    let age = this.state.age
    let weight = this.state.weight
    let height = this.state.height
    let gender = this.state.gender

    return (
      <Parallax
        blur={0}
        bgImage={require('./img/gold-curve-bck.jpg')}
        bgImageAlt="backgraund image"
        strength={300}
      >
        <div id="calctrack-section" className="calctrack-section-div">
          <div className="calctrack-section-content-div">
            <h1>Calculate or Track</h1>
            <ScrollAnimation 
              offset={0} 
              animateOnce={true}
              duration={1} 
              delay={1} 
              // animateIn="fadeIn"
              animateIn="zoomIn"
            >

              <div id="content" className="container">
                <h2>Enter your data and calculate BMI</h2>

                <Formik
                  initialValues={{
                    age, weight, height, gender
                }}
                onSubmit={this.onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={this.validate}
                >
                  <Form>
                    {/* <ErrorMessage 
                      name="age" 
                      component="div" 
                      className="errorMessage"
                    /> */}
                    {/* <ErrorMessage 
                      name="weight" 
                      component="div" 
                      className="errorMessage"
                    />
                    <ErrorMessage 
                      name="height" 
                      component="div" 
                      className="errorMessage"
                    /> */}
                    {/* <ErrorMessage 
                      name="gender" 
                      component="div" 
                      className="errorMessage"
                    /> */}
                    <fieldset className="formMainPageFieldset">
                      <div className="twoField">
                        <label className="formikLabelMain">Age</label>
                        <Field 
                          className="formikInputFildMain"
                          type="text"
                          name="age"
                        />
                        <label className="formikLabelMain">Weight</label>
                        <Field
                          className="formikInputFildMain"
                          type="text"
                          name="weight"
                        />
                      </div>
                      <div className="twoField">
                        <label className="formikLabelMain">Height</label>
                        <Field 
                          className="formikInputFildMain"
                          type="text"
                          name="height"
                        />
                        <label className="formikLabelMain">Gender</label>
                        <div className="genderDiv">
                          {/* <Field 
                            className="formikInputFildMain"
                            type="text"
                            name="gender"
                          /> */}
                          <label className="formikLabelMain">Male</label>
                          {' '}
                          <Field
                            className="formikInputFildRadio"
                            type="radio"
                            name="gender"
                            value="male"
                          />
                          {' '}
                          <label className="formikLabelMain">Female</label>
                          {' '}
                          <Field
                            className="formikInputFildRadio"
                            type="radio"
                            name="gender"
                            value="female"
                          />
                        </div>
                      </div>

                      <hr className="hrColor"></hr>

                      <div className="resultDiv">
                        <label className="formikLabelMain">BMI</label>
                        <Field 
                          className="formikInputFildMain"
                          type="text"
                          name="bmi"
                          value={
                            this.state.bmi !== ''
                            ?
                            this.state.bmi + ',  ' + this.getBmi(this.state.bmi)
                            :
                            undefined
                          }
                        />
                        </div>
                        <div className="resultDiv">
                        <label className="formikLabelMain">Ideal Weight</label>
                        <Field 
                          className="formikInputFildMain"
                          type="text"
                          name="ideal"
                          value={this.state.ideal}
                        />
                      </div>

                      <div className="FormFieldBtn">
                        <button 
                            // className="FormField__Button"
                            className="btn"
                            type="submit"
                        >
                        Calculate
                        </button>
                      </div>

                      <ErrorMessage
                        name="age"
                        component="div"
                        className="errorMessage"
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className="errorMessage"
                      />
                      <ErrorMessage
                        name="height"
                        component="div"
                        className="errorMessage"
                      />
                      <ErrorMessage 
                      name="gender" 
                      component="div" 
                      className="errorMessage"
                    />

                    </fieldset>
                  </Form>
                </Formik>
                     
              </div>
                          
            </ScrollAnimation>

            {/* <Link to="/" 
              className="btn" 
               // onClick={this.calkClicked.bind(this)}
              // onClick={(e) => {this.calkClicked(e)}}            
            >
              Calculate
            </Link> */}

            {
              isUserSignedIn
              ?
                // <Link to="/track/:email" className="btn">Track</Link>
                <Link to={`/track/:${AuthenticationService.getEmail()}`} className="btn">Track</Link>
              :
                <Link to="/sign-in" className="btn">Track</Link>
            }
          </div>
        </div>
      </Parallax>
    )
  }

}

export default CalcTrackComponent
