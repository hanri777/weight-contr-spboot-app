import React, { Component } from "react";
// For Date format
import moment from 'moment'
// Form library for form
import { Formik, Form, Field, ErrorMessage } from 'formik'
//import AuthenticationService from '../AuthenticationComponents/AuthenticationService'

import './AdminAddEditUserComponent.css'
import AuthenticationService from '../../Components/AuthenticationComponents/AuthenticationService'
import axios from 'axios'


class AdminAddUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetDate: moment(new Date()).format('DD.MM.YYYY'),

            id: '',
            email: '',
            password: '',
            name: '',
            lastname: '',
            age: '',
            gender: '',
            startDate: moment(new Date()).format('DD.MM.YYYY'),
            active: '',
            role: ''
        };

       
        //this.handleSubmit = this.handleSubmit.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    //1 Is called first, Returns erros back
    validate(values) {
        console.log(values)

        let errors = {}
        if(!values.name) {
            errors.name = 'Name is Required'
        }else if(values.name.length > 15) {
            errors.name = 'Must be 15 characters or less'
        }

        if(!values.lastname) {
            errors.lastname = 'Last Name is Required'
        } else if(values.lastname.length > 20) {
            errors.lastname = 'Must be 20 characters or less'
        }

        if (!values.email) {
            errors.email = 'Email Required';
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Password Required';
        } 
        // else if(!/(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/i.test(values.password)) {
        //     errors.password = 'Invalid password';
        // }

        if(!values.age) {
            errors.age = 'Age is Required'
        } else if(values.age.length > 12 && values.age.length < 100) {
            errors.age = 'Must be from 12 till 100'
        }

        if(!values.gender) {
            errors.gender = 'Gender is Required'
        } 

        if(!values.role) {
            errors.role = 'Role is Required'
        } 

        return errors
    }
    //2 Than called this, if there was no errors
    //'values' are values of fields
    onSubmit(values) {
        console.log(values)

        AuthenticationService.setupAxiosInterceptors()

        axios.post("http://localhost:8080/admin/user/add",
            {	
                // "id": values.id,
                "name": values.name,
                "lastName": values.lastname,
                "email": values.email,
                "password": values.password,
                "age": values.age,
                "gender": values.gender,
                "startDate": this.state.startDate,
                
                "roles":[{
                    //"USER" or "ADMIN"
                    "role": values.role                   
                }]
            }      
        )
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let date = this.state.targetDate
        let name = this.state.name
        let lastname = this.state.lastname
        let email = this.state.email
        let password = this.state.password
        let age = this.state.age
        let gender = this.state.gender
        let role = this.state.role

        return (
            <div className="FormCenter">
                <h1>Add User</h1>
                <div className="formikContainer">
                    {/* for Formik we do not need to create onChange and handleChange */}
                    <Formik 
                        //Asigning javascript object 2 curly brises
                        initialValues={{
                            //the first "date" is the name of Field
                            //date: date
                            //can be just while name is the same date: date
                            date, name, lastname, email, password, age, gender, role
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
                                        name="name" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="lastname" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="email" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="password" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="age" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="gender" 
                                        component="div" 
                                        className="erMessage"
                                    />
                                    <ErrorMessage 
                                        name="role" 
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

                                        <label className="formikLabel">First Name</label>
                                        {/* imput element */}
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="name"
                                            placeholder="Enter name of the user"
                                        />

                                        <label className="formikLabel">Last Name</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="lastname"
                                            placeholder="Enter lastname of the user"
                                        />

                                        <label className="formikLabel">Password</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="password"
                                            name="password"
                                            placeholder="Enter password of the user"
                                        />

                                        <label className="formikLabel">E-Mail Address</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="email"
                                            name="email"
                                            placeholder="Enter email of the user"
                                        />

                                        <label className="formikLabel">Age</label>
                                        <Field 
                                            className="formikInputFild"
                                            type="text"
                                            name="age"
                                            placeholder="Enter age of the user"
                                        />
                                        
                                        <div className="radioDiv">
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
                                        </div>

                                        <div className="radioDiv">
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
                                        </div>

                                        <div className="FormFieldBtn">
                                            <button 
                                                className="FormField__Button"
                                                type="submit"
                                            >
                                            Add User
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

export default AdminAddUserComponent
