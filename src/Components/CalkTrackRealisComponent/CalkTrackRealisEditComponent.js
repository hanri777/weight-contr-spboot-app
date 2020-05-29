import React, { Component } from "react";
// For Date format
// import moment from 'moment'
// Form library for form
import { Formik, Form, Field, ErrorMessage } from 'formik'

import './CalkTrackRealisAddEditComponent.css'
import UserManagementService from '../../api/UserManagementService'
import AuthenticationService from '../../Components/AuthenticationComponents/AuthenticationService'
import axios from 'axios'


class CalkTrackRealisEditComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            userId: '',
            date: '',
            setStartDate: false,
            weight: '',
            difference: '',

            //List of TrackUser
            trackRecords: [],

            idU: '',
            nameU: '',
            lastNameU: '',
            emailU: '',
            passwordU: '',
            activeU: '',
            ageU: '',
            genderU: '',
            startDateU: '',
            heightU: ''
        };
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleError = this.handleError.bind(this)

        this.handleCheckClick = this.handleCheckClick.bind(this)
    }

    //1 Is called first, Returns erros back
    validate(values) {
        //console.log(values)

        let errors = {}

        if(!values.weight) {
            errors.weight = 'Weight is Required'
        }else if(isNaN(values.weight) || values.weight <= 10 || values.weight > 400) {
            errors.weight = 'Enter number from 10 to 400'
        }

        if (!values.ageU) {
            errors.ageU = 'Age is Required'
          }else if(isNaN(values.ageU) || values.ageU <= 10 || values.ageU > 110) {
            errors.ageU = 'Enter number from 10 to 110'
        }

        if (!values.heightU) {
            errors.heightU = 'Height is Required'
          }else if(isNaN(values.heightU) || values.heightU <= 10 || values.heightU > 300) {
            errors.heightU = 'Enter number from 10 to 300'
        }

        // if(values.setstartdate){
        //     errors.name = 'Priv'
        // }

        return errors
    }
    //2 Than called this, if there was no errors
    //'values' are values of fields
    onSubmit(values) {
        //console.log(values)

        AuthenticationService.setupAxiosInterceptors()

        // axios.put(`http://localhost:8080/admin/user/edit/${this.props.match.params.email}`,
        axios.put("http://localhost:8080/user/track/edit",
            {	

                "id": values.id,
                "userId": values.userId,
                "start": values.setstartdate,
                "date": values.date,
                "weight": values.weight,
                "difference": values.difference
            }      
        )
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
        });

        axios.put("http://localhost:8080/user/users/edit",
            {	
                "id": values.idU,
                "name": values.nameU,
                "lastName": values.lastNameU,
                "email": values.emailU,
                "password": values.passwordU,
                "active": values.activeU,
                "age": values.ageU,
                "gender": values.genderU,
                "startDate": values.startDateU,
                "height": values.heightU,
                // "roles":[{
                //     //"USER" or "ADMIN"
                //     "role": values.role                   
                // }]   
            }      
        )
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
        });

       if(values.setstartdate === true) {

            axios.delete("http://localhost:8080/user/tracks/delete/start",
                
            {
                data: this.state.trackRecords.filter(record => record.id < this.state.id &&
                    record.userId === this.state.userId )
            }                   
                //{
                 //   data:
                    // [
                    //     {
                    //         "id": 222,
                    //         "userId": 179,
                    //         "start": "false",
                    //         "date": "2020-05-02",
                    //         "weight": "68",
                    //         "difference": "-0.2"
                    //     },
                    //     {
                    //         "id": 223,
                    //         "userId": 179,
                    //         "start": "false",
                    //         "date": "2020-05-02",
                    //         "weight": "67",
                    //         "difference": "-0.2"
                    //     }
                    // ]
               // }               
            )
            .then(function (response) {
                console.log(response);
              })
            .catch(function (error) {
                console.log(error);
            });
            
       }            

        this.props.history.goBack()
    }

    componentDidMount() {
            
            UserManagementService.retrieveUserRecordById(this.props.match.params.id)
            //.then(response => console.log(response))
            .then(response => this.setState({

                id: response.data.id,
                userId: response.data.userId,
                //String to Boolean
                setStartDate: JSON.parse(response.data.start),
                date: response.data.date,
                weight: response.data.weight,
                difference: response.data.difference,
            }))
            .catch(error => this.handleError(error)); 
            
            UserManagementService.retrieveByUserByEmail(AuthenticationService.getEmail())
        // AdminManagementService.retrieveUserByEmail(AuthenticationService.getEmail()) 
            .then(response => 
                this.setState({ 
                    idU: response.data.id,
                    nameU: response.data.name,
                    lastNameU: response.data.lastName,
                    emailU: response.data.email,
                    passwordU: response.data.password,
                    activeU: response.data.active,
                    ageU: response.data.age,
                    genderU: response.data.gender,
                    startDateU: response.data.startDate,
                    heightU: response.data.height,
                    //role: response.data.roles[0]['role'] 
                }))
            .catch(error => this.handleError(error)); 
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = '';
        if (error.message)
            errorMessage += error.message
        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({
            message: errorMessage,
            retreiveUserFailed: true
        })
    }

    handleCheckClick(setstartdate) {

        if(!(setstartdate === true)){
            if(window.confirm('Are you sure? Your will delete all previous records!')){
                this.setState({
                    setStartDate: true
                })
            }else {
                this.setState({
                    setStartDate: false
                })
            }
        }else if(!(setstartdate === false)){
            this.setState({
                setStartDate: false,
            })
        }

        // Fills state - trackRecords: []
        if(setstartdate === false) {
            UserManagementService.retrieveUserRecordsById(this.state.userId)
               .then(response => this.setState({
                    trackRecords: response.data                   
               }))
               .catch(function (error) {
                    console.log(error);
                });       

        }else {
            this.setState({
                trackRecords: []
            })
            
        }


    }

    render() {
        
        let id = this.state.id
        let userId = this.state.userId
        let date = this.state.date
        let weight = this.state.weight
        let difference = this.state.difference

        let idU = this.state.idU
        let nameU = this.state.nameU
        let lastNameU = this.state.lastNameU
        let emailU = this.state.emailU
        let passwordU = this.state.passwordU
        let activeU = this.state.activeU
        let ageU = this.state.ageU
        let genderU = this.state.genderU
        let startDateU = this.state.startDateU
        let heightU = this.state.heightU
        
        //let setstartdate = this.state.setStartDate
        //convert string to boolean
        //let setstartdate = (this.state.setStartDate === 'true');

        let setstartdate

        if(this.state.setStartDate === true ){
            setstartdate = true
        }else if (this.state.setStartDate === false) {
            setstartdate = false       
        }


        //console.log(setstartdate)

        return (
            <div className="FormCenter">
                <h1>Edit Record</h1>
                <div className="formikContainer">
                    {/* for Formik we do not need to create onChange and handleChange */}
                    <Formik 
                        //Asigning javascript object 2 curly brises
                        initialValues={{
                            //the first "date" is the name of Field
                            //date: date
                            //can be just while name is the same date: date
                            date, id, userId, weight, difference,
                            setstartdate, 
                            idU, nameU, lastNameU, emailU, passwordU, activeU, ageU, genderU, startDateU, heightU
                        }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        // Fill fields
                        enableReinitialize={true}
                    >
                        {/* define method which will return entire form */}
                        {
                            //argument of function
                            (props) => (
                                //return from function
                                <Form>
                                    <ErrorMessage 
                                        name="weight" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="ageU" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="heightU" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    
                                    {/* inside element which I want to show */}
                                    <fieldset className="formFieldset">

                                        <label className="formikLabel">Date</label>
                                        {/* imput element */}
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="date"
                                        />

                                        <label className="formikLabel">Weight</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="weight"
                                            placeholder="Enter your weight"
                                        />

                                        <label className="formikLabel">Age</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="ageU"
                                            placeholder="Enter your age"
                                        />

                                        <label className="formikLabel">Height</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="heightU"
                                            placeholder="Enter your height"
                                        />

                                        <div className="radioDiv">
                                        <label className="formikLabel">Set As Start Date?</label>
                                            {' '}
                                            <Field 
                                                className="formikInputFildRadio"
                                                type="checkbox"
                                                name="setstartdate"
                                                onChange={()=>this.handleCheckClick(setstartdate)}
                                                disabled = {setstartdate}
                                            />  
                                        </div>

                                        {/* <label className="formikLabel">Last Name</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="lastname"
                                            placeholder="Enter lastname of the user"
                                        /> */}

                                        {/* <label className="formikLabel">Password</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="password"
                                            name="password"
                                            placeholder="Enter password of the user"
                                        /> */}

                                        {/* <label className="formikLabel">E-Mail Address</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="email"
                                            name="email"
                                            placeholder="Enter email of the user"
                                        /> */}

                                        {/* <label className="formikLabel">Age</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="age"
                                            placeholder="Enter age of the user"
                                        /> */}
                                        
                                        {/* <div>
                                        <label className="formikLabel">Male</label>
                                        {' '}
                                        <Field 
                                            className="formikInputFildRadio"
                                            type="radio"
                                            name="gender"
                                            value="male" 
                                        />

                                        {' '}

                                        <label className="formikLabel">Female</label>
                                        {' '}
                                        <Field 
                                            className="formikInputFildRadio"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                        />
                                        </div> */}

                                        {/* <div>
                                        <label className="formikLabel">USER</label>
                                        {' '}
                                        <Field 
                                            className="formikInputFildRadio"
                                            type="radio"
                                            name="role"
                                            value="USER" 
                                        />

                                        {' '}

                                        <label className="formikLabel">ADMIN</label>
                                        {' '}
                                        <Field 
                                            className="formikInputFildRadio"
                                            type="radio"
                                            name="role"
                                            value="ADMIN"
                                        />
                                        </div> */}

                                        <div className="FormFieldBtn">
                                            <button 
                                                className="FormField__Button"
                                                type="submit"
                                            >
                                            Edit Record
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

export default CalkTrackRealisEditComponent
