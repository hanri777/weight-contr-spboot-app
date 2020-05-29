import React, { Component } from "react";
import "./LogRegComponent.css";
import { NavLink, Link } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import SignInComponent from './SignInComponent';

class LogRegComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUpClicked: false
        }

        this.signInClicked = this.signInClicked.bind(this)
        this.isSignUpClicked = this.isSignUpClicked.bind(this)
    }

    signInClicked() {
        this.setState({
            isSignUpClicked: false
        })
    }

    isSignUpClicked() {
        this.setState({
            isSignUpClicked: true
        })
    }

    render() {
        return (
            <div>
                <div className="LogReg">
                    <div className="LogReg__Aside"></div>
                    <div className="LogReg__Form">
                        <div className="LogReg_flex">
                            <div className="FromHomButton">                                
                                <Link to="/" className="FormHomePointer">Home</Link>
                            </div>
                            <div className="PageSwitcher">
                                <NavLink
                                    to="/sign-in"
                                    activeClassName="PageSwitcher__Item--Active"
                                    className="PageSwitcher__Item"
                                    onClick={this.signInClicked}
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    // exact
                                    to="/sign-in"
                                    activeClassName="PageSwitcher__Item--Active"
                                    className="PageSwitcher__Item"
                                    onClick={this.isSignUpClicked}
                                >
                                    Sign Up
                                </NavLink>
                            </div>

                            {/* <div className="FormTitle">
                                <NavLink
                                    to="/sign-in"
                                    activeClassName="FormTitle__Link--Active"
                                    className="FormTitle__Link"
                                >
                                    Sign In
                                </NavLink>{" "}
                                or{" "}
                                <NavLink
                                    // exact
                                    to="/sign-up"
                                    activeClassName="FormTitle__Link--Active"
                                    className="FormTitle__Link"
                                >
                                    Sign Up
                                </NavLink>
                            </div> */}

                        </div>

                        {
                            this.state.isSignUpClicked 
                            ? 
                                <SignUpComponent />
                            : 
                                <SignInComponent />
                        }

                        {/* {this.state.isSignUpClicked && <SignUpComponent />} */}
                        {/* {!this.state.isSignUpClicked && <SignInComponent />} */}
                        
                    </div>
                </div>           
            </div>
        );
    }
}

export default LogRegComponent;
