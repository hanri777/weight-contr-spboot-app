import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'
import { Route, Redirect } from 'react-router'

export class AuthenticatedRoute extends Component {
  render() {
    if(AuthenticationService.isUserSignedIn()) {
      //spred operator - maps all parameters of Route here
      return <Route {...this.props} />
    }else {
      return <Redirect to="/sign-in" />
    }
  }
}

export default AuthenticatedRoute
