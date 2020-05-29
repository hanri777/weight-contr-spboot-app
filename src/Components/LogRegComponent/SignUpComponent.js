import React, { Component } from "react";
import axios from 'axios'
//import AuthenticationService from '../Components/AuthenticationComponents/AuthenticationService'

class SignUpComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            lastname: '',
            age: '',
            height: '',
            gender: '',
            startDate: '',
            active: '',
            // hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange= this.handleRadioChange.bind(this);
    }



    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRadioChange(e){
        this.setState({
            gender: e.target.value,
            startDate: new Date().toLocaleDateString()
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
        //axios.post(url) -> to server, save data on server and so on
        axios.post("http://localhost:8080/signup",
            {	
                "name": this.state.name,
                "lastName": this.state.lastname,
                "email": this.state.email,
                "password": this.state.password,
                "age": this.state.age,
                "height": this.state.height,
                "gender": this.state.gender,
                "startDate": this.state.startDate,
                
                "roles":[{
                    "role": "USER"
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
        return (
            <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">
                            First name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="FormField__Input"
                            placeholder="Enter your first name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="FormField__Input"
                            placeholder="Enter your last name"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="FormField__Input"
                            placeholder="Enter your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="FormField__Input"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="Age">
                        Age
                        </label>
                        <input
                            type="text"
                            id="age"
                            className="FormField__Input"
                            placeholder="Enter your age (e.g. 34)"
                            name="age"
                            value={this.state.age}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="Age">
                        Height
                        </label>
                        <input
                            type="text"
                            id="height"
                            className="FormField__Input"
                            placeholder="Enter your height in cm (e.g. 165)"
                            name="height"
                            value={this.state.height}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">                       
                        <label className="FormField__RadioLabelMale">
                            Male {" "}                                                     
                            <input
                                className="FormField__Checkbox"
                                type="radio"
                                name="gender"
                                value='male'
                                onChange={this.handleRadioChange}
                                checked={this.state.gender === 'male'}                               
                            />
                        </label>
                        {" "}
                        <label className="FormField__RadioLabelFemale">
                            Female {" "}
                            <input
                                className="FormField__Checkbox"
                                type="radio"
                                name="gender"
                                value='female'
                                onChange={this.handleRadioChange}
                                checked={this.state.gender === 'female'}                               
                            />
                        </label>                       
                    </div>

                    <div className="FormField">
                        <label className="FormField__CheckboxLabel">
                            <input
                                className="FormField__Checkbox"
                                type="checkbox"
                                name="hasAgreed"
                                value={this.state.hasAgreed}
                                onChange={this.handleChange}
                            />{" "}
                            I agree all statements in{" "}
                            <a href="/" className="FormField__TermsLink">
                                terms of service
                            </a>
                        </label>
                    </div>

                    <div className="FormField">
                        <button 
                            className="FormField__Button"
                        >
                            Sign Up
                        </button>
                        {/* <Link to="/sign-in" className="FormField__Link">
                            I'm already member
                        </Link> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpComponent;
