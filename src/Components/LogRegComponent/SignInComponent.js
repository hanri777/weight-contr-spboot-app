import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthenticationService from "../AuthenticationComponents/AuthenticationService"

class SignInComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            hasSignInFailed: false,
            // showSuccessMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //email= anri@mail.an, password=anri
        // if(this.state.email === 'hanri@gmail.com' && this.state.password === 'hanri'){
        //     AuthenticationService.registerSuccessfulSignIn(this.state.email, this.state.password);
        //     // this.props.history.push(`/track/${this.state.email}`)  
        //     this.props.history.push("/")                
        // }
        // else {
        //     console.log('Failed')
        //     this.setState({
        //         hasSignInFailed: true,
        //         // showSuccessMessage: false
        //     })
        // }

        // AuthenticationService
        // .executeBasicAuthenticationService(this.state.email, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccessfulSignIn(this.state.email, this.state.password); 
        //         this.props.history.push("/") 
        //     }
        // )
        // .catch(
        //     () => {
        //         console.log('Failed')
        //         this.setState({
        //             hasSignInFailed: true,
        //             // showSuccessMessage: false
        //         })
        //     }
        // )

        AuthenticationService
        .executeJwtAuthenticationService(this.state.email, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulSignInForJwt(this.state.email, response.data.token); 
                this.props.history.push("/") 
            }
        )
        .catch(
            () => {
                console.log('Failed')
                this.setState({
                    hasSignInFailed: true,
                    // showSuccessMessage: false
                })
            }
        )
            
        console.log("The form was submitted with the following data:")
        console.log(this.state);
        //axios.post(url) -> to server, save data on server and so on       
    }

    render() {
        return (
            <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
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
                        <button className="FormField__Button">
                            Sign In
                        </button>

                        {/* <Link to="/sign-in" className="FormField__Link">
                            Create an account
                        </Link> */}
                    </div>

                    <div>
                        {/* <ShowInvalidCredentials hasSignInFailed={this.state.hasSignInFailed} /> */}
                        {this.state.hasSignInFailed && <div>Invalid Credentials</div>}
                        {/* <ShowSuccessMessage showSuccessMessage={this.state.showSuccessMessage} /> */}
                        {/* {this.state.showSuccessMessage && <div>SignIn Successful</div>} */}
                    </div>
                    
                </form>
            </div>
        );
    }
}

//These are function componnents

// function ShowInvalidCredentials(props) {
//     if(props.hasSignInFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowSuccessMessage(props) {
//     if(props.showSuccessMessage){
//         return <div>SignIn Successful</div>
//     }
//     return null
// }

export default withRouter(SignInComponent);
