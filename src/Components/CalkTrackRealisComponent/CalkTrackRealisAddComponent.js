import React, { Component } from "react";
// For Date format
import moment from 'moment'
// Form library for form
import { Formik, Form, Field, ErrorMessage } from 'formik'
//import AuthenticationService from '../AuthenticationComponents/AuthenticationService'

import './CalkTrackRealisAddEditComponent.css'
import AuthenticationService from '../../Components/AuthenticationComponents/AuthenticationService'
import axios from 'axios'


class CalkTrackRealisAddComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            start: '',
            // currentDate: moment(new Date()).format('DD.MM.YYYY'),
            currentDate: '',
            setStartDate: '',
            weight: '',
            difference: '-0.2',

            isRecordAdded: 'false'
        };
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    //1 Is called first, Returns erros back
    validate(values) {
        console.log(values)

        let errors = {}

        if(!values.weight) {
            errors.weight = 'Weight is Required'
        }else if(isNaN(values.weight) || values.weight <= 10 || values.weight > 400) {
            errors.weight = 'Enter number from 10 to 400'
          }


        return errors
    }
    //2 Than called this, if there was no errors
    //'values' are values of fields
    onSubmit(values) {
        //console.log(values)
        
        AuthenticationService.setupAxiosInterceptors()

        if(
            //sessionStorage.getItem('itemStart') === undefined ||
             sessionStorage.getItem('itemStart') === 'null')
        {
            axios.post("http://localhost:8080/user/track/add",
                {	
                    // "id": values.id,
                    // "userId": values.userId,
                    "userId": this.props.match.params.userId,
                    "start": 'true',
                    "date": values.currentdate,
                    "weight": values.weight,
                    //"difference": values.difference
                    "difference": '-0.2',
                }      
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            //console.log('null')
        }
            
        else if(sessionStorage.getItem('itemStart') === 'true') {
            axios.post("http://localhost:8080/user/track/add",
                {	
                    // "id": values.id,
                    // "userId": values.userId,
                    "userId": this.props.match.params.userId,
                    "start": 'false',
                    //this.state.setStartDate,
                    //values.setstartdate,
                    "date": values.currentdate,
                    "weight": values.weight,
                    //"difference": values.difference
                    "difference": '-0.2',
                }      
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            //console.log('true')

        }else if(sessionStorage.getItem('itemStart') === 'false') {
            axios.post("http://localhost:8080/user/track/add",
                {	
                    // "id": values.id,
                    // "userId": values.userId,
                    "userId": this.props.match.params.userId,
                    "start": 'false',
                    //this.state.setStartDate,
                    //values.setstartdate,
                    "date": values.currentdate,
                    "weight": values.weight,
                    //"difference": values.difference
                    "difference": '-0.2',
                }      
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            //console.log('false')
        }

        this.setState({
            isRecordAdded: 'true'
        })

        sessionStorage.removeItem('itemStart')
        //sessionStorage.clear()
        //Redirect back, and update page
        this.props.history.goBack().reload(true)
    }

    render() {
        // let userId = this.state.userId
        //let userId = this.props.match.params.userId
        let currentdate = moment(new Date()).format('YYYY-MM-DD')
        //let setstartdate = this.state.setStartDate
        let weight = this.state.weight
        let difference = this.state.difference
        //console.log(currentdate)
        

        return (
            <div className="FormCenter">
                <h1>Add Record</h1>
                <div className="formikContainer">
                    {/* for Formik we do not need to create onChange and handleChange */}
                    <Formik 
                        //Asigning javascript object 2 curly brises
                        initialValues={{
                            //the first "date" is the name of Field
                            //date: date
                            //can be just while name is the same date: date
                            currentdate, weight, difference 
                            //setstartdate
                        }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {/* define method which will return entire form */}
                        {
                            //argument of function
                            (props) => (
                                //return from function
                                <Form>
                                    <ErrorMessage 
                                        name="currentdate" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="weight" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    
                                    {/* inside element which I want to show */}
                                    <fieldset className="formFieldset">

                                        <label className="formikLabel">Current Date</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="currentdate"
                                        />

                                        <label className="formikLabel">Weight</label>
                                        {/* imput element */}
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="weight"
                                            placeholder="Enter your weight in kg (e.g. 65)"
                                        />

                                        {/* <div className="radioDiv">
                                        <label className="formikLabel">Set As Start Date?</label>
                                            {' '}
                                            <Field 
                                                className="formikInputFildRadio"
                                                type="checkbox"
                                                name="setstartdate"
                                            />
                                           
                                        </div> */}

                                        <div className="FormFieldBtn">
                                            <button 
                                                className="FormField__Button"
                                                type="submit"
                                            >
                                            Add Record
                                            </button>
                                        </div>

                                    </fieldset>
                                </Form>
                            )
                        }
                    </Formik>
                </div>

            </div>
        );
    }
}

export default CalkTrackRealisAddComponent
