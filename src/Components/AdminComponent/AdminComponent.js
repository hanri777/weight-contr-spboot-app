import React, { Component } from 'react'
import HeaderMiniComponents from '../HeaderMiniComponent/HeaderMiniComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import AdminManagementService from '../../api/AdminManagementService'
import AdminUserComponent from '../AdminComponent/AdminUserComponent'

import './AdminComponent.css'

class AdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mydata: [],
            oneUser: [],
            role : "",           
            message: "",
            email: "",
            retreiveUserFailed: false
        }

        this.retreiveData = this.retreiveData.bind(this);
        this.handleSuccessfulResponce = this.handleSuccessfulResponce.bind(this)
        this.handleError = this.handleError.bind(this)
        this.retreiveOneUserData = this.retreiveOneUserData.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.deleteUserByIdClick = this.deleteUserByIdClick.bind(this)
        this.addUserClick = this.addUserClick.bind(this)
        this.editUserByEmailClick = this.editUserByEmailClick.bind(this)
    }

    addUserClick() {
        this.props.history.push("/admin/add")       
    }

    editUserByEmailClick(email) {
        this.props.history.push(`/admin/edit/${email}`)
    }

    deleteUserByIdClick(id) {
        AdminManagementService.deleteUserById(id)
            .then(response => this.handleDeleteUserSuccessfulResponce(response))
            .catch(error => this.handleError(error))
    }

    handleDeleteUserSuccessfulResponce(response) {
        console.log(response)
        this.setState({
            oneUser: response.data           
        });
    }

    retreiveOneUserData() {
        AdminManagementService.retrieveUserByEmail(this.state.email)
            .then(response => this.handleOneUserSuccessfulResponce(response))
            .catch(error => this.handleError(error));
    }

    handleOneUserSuccessfulResponce(response) {
        console.log(response)
        this.setState({
            oneUser: response.data,
            role: response.data.roles[0]['role']
        });
    }

    retreiveData() {
        AdminManagementService.retrieveAllUsers()
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
            message: errorMessage,
            retreiveUserFailed: true
        })
    }

    handleEmailChange(event) {
        let email = event.target.value
        this.setState({
            email: email
        });
    }

    render() {
        return (
            <div>
                <HeaderMiniComponents />

                <div className="container-div">
                    <div className="top-div">
                        <h1>Welcome admin 
                            {/* {this.props.match.params.email} */}
                        </h1>

                        <table className="content-table weight-table">
                            <caption>
                                <h1>All Users</h1>
                                <button
                                    className="retreive-btn"
                                    onClick={this.retreiveData}
                                >
                                    Retreive Users
                                </button> 
                                {/* space */}
                                {/* {' '} */}
                                &nbsp;
                                <button
                                    className="retreive-btn"
                                    onClick={this.addUserClick}
                                >
                                    Add User
                                </button>                              
                            </caption>
                            
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>E-Mail</th>
                                        {/* <th>Password </th> */}
                                        <th>Active</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Start Date</th>
                                        {/* <th>Edit</th> */}
                                        {/* <th>Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mydata.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            {/* <td>{item.password}</td> */}
                                            <td>{item.active}</td>
                                            <td>{item.age}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.startDate}</td>
                                            {/* <td>
                                                <button>
                                                    Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button>
                                                    Delete
                                                </button>
                                            </td> */}
                                        </tr>
                                    ).reverse()}
                                </tbody>
                        </table>

                        <table className="content-table weight-table">
                            <caption>
                                <h1>User</h1>
                                <button
                                    className="retreive-btn"
                                    onClick={this.retreiveOneUserData}
                                >
                                    Retreive User By Email
                                </button>
                                &nbsp;
                                <input
                                    type="email"
                                    id="email"
                                    // className="FormField__Input"
                                    placeholder="Enter user email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                                <div>
                                    {this.state.retreiveUserFailed && <div>There is no such a user</div>}
                                </div>
                                &nbsp;
                            </caption>
                                
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>E-Mail</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Start Date</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={this.state.oneUser.id}>
                                        <td>{this.state.oneUser.name}</td>
                                        <td>{this.state.oneUser.lastName}</td>
                                        <td>{this.state.oneUser.email}</td>
                                        <td>{this.state.role}</td>
                                        <td>{this.state.oneUser.active}</td>
                                        <td>{this.state.oneUser.age}</td>
                                        <td>{this.state.oneUser.gender}</td>
                                        <td>{this.state.oneUser.startDate}</td>
                                        <td>
                                            <button onClick={() => this.editUserByEmailClick(this.state.oneUser.email)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.deleteUserByIdClick(this.state.oneUser.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                        </table>

                    </div>

                    <AdminUserComponent 
                        userName={this.state.oneUser.name}
                        userId={this.state.oneUser.id}
                    />                    
                </div>

                <FooterComponent />
            </div>
        )
    }
}

export default AdminComponent
