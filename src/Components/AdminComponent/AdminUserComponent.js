import React, { Component } from 'react'
import HeaderMiniComponents from '../HeaderMiniComponent/HeaderMiniComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import UserManagementService from '../../api/UserManagementService'

import './AdminComponent.css'

export class AdminUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mydata: [],
            message: ""
        }

        this.retreiveData = this.retreiveData.bind(this);
        this.handleSuccessfulResponce = this.handleSuccessfulResponce.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    retreiveData() {
        UserManagementService.retrieveUserRecordsById(this.props.userId)
            .then(response => this.handleSuccessfulResponce(response))
            .catch(error => this.handleError(error));
    }

    handleSuccessfulResponce(response) {
        console.log(response)
        this.setState({
            mydata: response.data
        })
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
            message: errorMessage
        })
    }

    render() {
        return (
            <div>
                <HeaderMiniComponents />

                <div className="container-div">
                    <div className="top-div">
                        <h1>
                            Personal data of {this.props.userName}, ID: {this.props.userId}
                            {/* {this.props.match.params.email} */}
                        </h1>
                        <button
                            className="retreive-btn"
                            onClick={this.retreiveData}
                        >
                            Retreive
                        </button>
                    </div>
                    <div className="buttom-div">
                        <div className="left-div">
                            
                            <table className="content-table average-table">
                                <caption><h1>Average Weight Change</h1></caption>
                                <thead>
                                    <tr>
                                        <th>Daily</th>
                                        <th>Weekly</th>
                                        <th>Monthly</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>-0.3 kg</td>
                                        <td>-1.2 kg</td>
                                        <td>-3 kg</td>
                                        <td>-10 kg</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="content-table average-table">
                                <caption><h1>Statistics</h1></caption>
                                <thead>
                                    <tr>
                                        <th>BMI</th>
                                        <th>Start Weight</th>
                                        <th>Goal</th>
                                        <th>Remain</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Obese Class 2</td>
                                        <td>120 kg</td>
                                        <td>90 kg</td>
                                        <td>30 kg</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="right-div">
                            <table className="content-table weight-table">
                                <caption><h1>Weight Tracking</h1></caption>
                                <thead>
                                    <tr>
                                        <th>Start</th>
                                        <th>Date</th>
                                        <th>Weight</th>
                                        <th>Difference </th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mydata.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.start}</td>
                                            <td>{item.date}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.difference}</td>
                                            <td>
                                                <button>
                                                    Edit
                                        </button>
                                            </td>
                                            <td>
                                                <button>
                                                    Delete
                                        </button>
                                            </td>
                                        </tr>
                                    ).reverse()}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </div>
        )
    }
}

export default AdminUserComponent
