import axios from 'axios'
import {API_URL} from '../Constants'
import AuthenticationService from '../Components/AuthenticationComponents/AuthenticationService'

class UserManagementService {

    retrieveByUserByEmail(email) {
        AuthenticationService.setupAxiosInterceptors()

        return axios.get(`${API_URL}/retrieve/user/${email}`); 
    }

    retrieveUserRecordsById(id) {
        AuthenticationService.setupAxiosInterceptors()

        return axios.get(`${API_URL}/user/tracks/${id}`);
    }

    retrieveUserRecordById(id) {
        AuthenticationService.setupAxiosInterceptors()

        return axios.get(`${API_URL}/user/track/${id}`);
    }

    deleteTrackingRecord(id) {
        //console.log('exeduted service')
        AuthenticationService.setupAxiosInterceptors()

        return axios.delete(`${API_URL}/user/track/${id}`)
    }

    // updateTrackingRecord(id, Date) {
    //     //console.log('exeduted service')
    //     AuthenticationService.setupAxiosInterceptors()


    // }

    // createTrackingRecord() {
    //     //console.log('exeduted service')
    //     AuthenticationService.setupAxiosInterceptors()

    //     return axios.post(`${API_URL}/user/track/add`)
    // }

}

export default new UserManagementService()