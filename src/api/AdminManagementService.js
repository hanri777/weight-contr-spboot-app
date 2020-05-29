import axios from 'axios'
import {API_URL} from '../Constants'
import AuthenticationService from '../Components/AuthenticationComponents/AuthenticationService'

class AdminManagementService {

    retrieveAllUsers() {         
        //Adding token authorization in headers
        AuthenticationService.setupAxiosInterceptors()

        //Hardcoded
        // let username = 'hanri@gmail.com'
        // let password = 'hanri'
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
       
        return axios.get(`${API_URL}/admin`
        // ,
        //     {
        //         headers : {
        //             authorization: basicAuthHeader
        //         }
        //     }
         );
         
    }

    retrieveUserByEmail(email) {
        AuthenticationService.setupAxiosInterceptors()

        return axios.get(`${API_URL}/admin/user/${email}`); 
    }

    deleteUserById(id) {
        AuthenticationService.setupAxiosInterceptors()
        
        return axios.delete(`${API_URL}/admin/user/delete/${id}`)
    }

    // editUserByEmail(email) {
    //     AuthenticationService.setupAxiosInterceptors()

    //     return axios.put(`${API_URL}/admin/user/edit/${email}`)
    // }

    // addUserByAdmin() {
    //     AuthenticationService.setupAxiosInterceptors()
    // }

}

export default new AdminManagementService()