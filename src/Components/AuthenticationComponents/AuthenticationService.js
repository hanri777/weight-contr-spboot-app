import axios from 'axios'
import {API_URL} from '../../Constants'

export const EMAIL_SESSION_ATTRIBUTE_NAME = 'authenticatedUserEmail'
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedToken'


class AuthenticationService {

    // createBasicAuthToken(email, password) {
    //     return 'Basic ' + window.btoa(email + ":" + password);
    // }

    // executeBasicAuthenticationService(email, password) {
    //     return axios.get('http://localhost:8080/basicauth',
    //         {
    //             headers : {
    //                 authorization: this.createBasicAuthToken(email, password)
    //             }
    //         }
    //     )
    // }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`,
            {
                username, password
            }
        )
    }

    registerSuccessfulSignInForJwt(email, token) {
        sessionStorage.setItem(EMAIL_SESSION_ATTRIBUTE_NAME, email);
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
        
        //Do not work here, dont know why
        //this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    // createJwtAuthToken(token) {
    //     return 'Bearer ' + token
    // }

    // registerSuccessfulSignIn(email, password) {

    //     console.log("registerSuccessfulSignIn");

    //     sessionStorage.setItem('authenticatedUser', email);
    //     sessionStorage.setItem('authenticatedUserPassw', password);

    //     //this.setupAxiosInterceptors(basicAuthHeader);
    // }

    signout() {
        sessionStorage.removeItem(EMAIL_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    }

    isUserSignedIn() {
        let userEmail = sessionStorage.getItem(EMAIL_SESSION_ATTRIBUTE_NAME)
        if(userEmail === null) return false
        return true
    }

    getEmail() {
        let email = sessionStorage.getItem(EMAIL_SESSION_ATTRIBUTE_NAME)
        return email
    }

    //is called in CalkTrackRealisDataService.js
    setupAxiosInterceptors() {
        //let email = sessionStorage.getItem('authenticatedUser')
        //let password = sessionStorage.getItem('authenticatedUserPassw')
        //let basicAuthHeader = 'Basic ' + window.btoa(email + ":" + password);

        let fullToken = 'Bearer ' + sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
    
        axios.interceptors.request.use(
            //config as a imput, and updated config as output(return)
            (config) => {
                if(this.isUserSignedIn()) {
                    config.headers.authorization = fullToken
                    //basicAuthHeader
                }
                return config;               
            }           
        )       
    }

}

export default new AuthenticationService()