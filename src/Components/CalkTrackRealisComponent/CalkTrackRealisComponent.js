import React, { Component } from 'react'
import HeaderMiniComponents from '../HeaderMiniComponent/HeaderMiniComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import AuthenticationService from '../AuthenticationComponents/AuthenticationService'
import UserManagementService from '../../api/UserManagementService'

import './CalkTrackRealisComponent.css'

class CalkTrackRealisComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mydata: [],
            mydata7: [],
            mydata30: [],

            message: "",
            id: "",
            name: "",
            userId: "",
            height: "",
            gender: "",

            isDeleted: 'false'
        }

        this.addUserRecordClick = this.addUserRecordClick.bind(this);
        this.handleError = this.handleError.bind(this)
        this.editUserRecordClick = this.editUserRecordClick.bind(this)
        this.deleteUserRecordClick = this.deleteUserRecordClick.bind(this)
        this.getBmi = this.getBmi.bind(this)
    }

    addUserRecordClick(userId) {
        this.props.history.push(`/track/add/${userId}`)
        //&${start} can be second parameter
        
        if(this.state.mydata.length === 0){
            //let key = 'itemStart'
            sessionStorage.setItem('itemStart', 'null')
        }else if(this.state.mydata[this.state.mydata.length-1].start === 'true'){
            sessionStorage.setItem('itemStart', this.state.mydata[this.state.mydata.length-1].start)
        }else if(this.state.mydata[this.state.mydata.length-1].start === 'false'){
            sessionStorage.setItem('itemStart', this.state.mydata[this.state.mydata.length-1].start)
        }    
    }

    editUserRecordClick(id) {
        this.props.history.push(`/track/edit/${id}`)
    }

    deleteUserRecordClick(id) {
        if(window.confirm('Are you sure to delete this record?')){
            UserManagementService.deleteTrackingRecord(id)

            //try to change state foe refresh - do not work here
            //this.setState({ state: this.state })

            //reload the page
            //window.location.reload(false)

            // this.setState({
            //     isDeleted: 'true'
            // })
            //? update 
            this.componentDidMount()
        }
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
 
    componentDidMount() {

        UserManagementService.retrieveByUserByEmail(AuthenticationService.getEmail())
        // AdminManagementService.retrieveUserByEmail(AuthenticationService.getEmail()) 
            .then(response => {
                this.setState({ 
                    name: response.data.name, 
                    userId: response.data.id,
                    height: response.data.height,
                    gender: response.data.gender
                })
                //console.log(response.data)
                UserManagementService.retrieveUserRecordsById(response.data.id)
                //console.log(response.data)
                .then(response => this.setState({
                    mydata: response.data,
                    mydata7: response.data.slice(-7),
                    mydata30: response.data.slice(-30)                  
                }))
                //console.log(response.data)
            })
            .catch(error => this.handleError(error));            
    }
    
    getBmi(bmi) {
        if(bmi < 18.5) {
            return "Underweight";
        }
        if(bmi >= 18.5 && bmi < 24.9) {
            return "Normal weight";
        }
        if(bmi >= 25 && bmi < 29.9) {
            return "Overweight";
        }
        if(bmi >= 30) {
            return "Obesity";
        }
    }
    
    render() {
        //console.log(this.state.startDateFirst)
        //  if(this.state.mydata[this.state.mydata.length-1] !== undefined)
        // console.log(this.state.mydata[this.state.mydata.length-1].weight)
        // console.log(this.state.height)

        // if(this.state.mydata[0] !== undefined)
        // console.log(this.state.mydata[0].start) or
        //     if(this.state.mydata[0].start === "true")
        // console.log(this.state.mydata[0].weight)

        // var diff = this.state.mydata[1]
        //console.log(diff)

        return (
            <div>
                <HeaderMiniComponents />

                <div className="container-div">
                    <div className="top-div">
                        <h1>Welcome {this.state.name}</h1>
                        {/* <h1>Welcome {this.props.match.params.email}</h1> */}
                        
                        <button
                            className="retreive-btn"
                            onClick={()=>this.addUserRecordClick(this.state.userId)}
                        >
                            Add Record
                        </button>
                    </div>
                    <div className="buttom-div">
                        <div className="left-div">
                            
                            <table className="content-table average-table">
                                <caption><h1>Average Weight Change</h1></caption>
                                <thead>
                                    <tr>
                                        <th>Daily</th>
                                        <th>Last Week</th>
                                        <th>Last Month</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                (this.state.mydata7[0] !== undefined) &&
                                                (this.state.mydata7.length === 7) &&
                                                //(this.state.mydata7[0].start === "true") &&
                                                (this.state.mydata7[this.state.mydata7.length-1] !== undefined)
                                                ?
                                                (this.state.mydata7[0].weight - 
                                                    this.state.mydata7[this.state.mydata7.length-1].weight) >=0
                                                    ?
                                                    "-" + ((this.state.mydata7[0].weight - 
                                                        this.state.mydata7[this.state.mydata7.length-1].weight)/7).toFixed(2) 
                                                        + " kg"
                                                    : 
                                                    "+" + (Math.abs((this.state.mydata7[0].weight - 
                                                        this.state.mydata7[this.state.mydata7.length-1].weight))/7).toFixed(2) 
                                                        + " kg"                
                                                :
                                                null   
                                            }
                                        </td>
                                        <td>
                                            {
                                                (this.state.mydata7[0] !== undefined) &&
                                                (this.state.mydata7.length === 7) &&
                                                //(this.state.mydata7[0].start === "true") &&
                                                (this.state.mydata7[this.state.mydata7.length-1] !== undefined)
                                                ?
                                                (this.state.mydata7[0].weight - 
                                                this.state.mydata7[this.state.mydata7.length-1].weight) >=0
                                                ?
                                                "-" + ((this.state.mydata7[0].weight - 
                                                    this.state.mydata7[this.state.mydata7.length-1].weight)).toFixed(2) + " kg"
                                                : 
                                                "+" + (Math.abs((this.state.mydata7[0].weight - 
                                                    this.state.mydata7[this.state.mydata7.length-1].weight))).toFixed(2) + " kg"                                           
                                                :
                                                null 
                                            }
                                        </td>
                                        <td>
                                            {
                                                (this.state.mydata30[0] !== undefined) &&
                                                (this.state.mydata30.length === 30) &&
                                                //(this.state.mydata7[0].start === "true") &&
                                                (this.state.mydata30[this.state.mydata30.length-1] !== undefined)
                                                ?
                                                (this.state.mydata30[0].weight - 
                                                this.state.mydata30[this.state.mydata30.length-1].weight) >=0
                                                ?
                                                "-" + ((this.state.mydata30[0].weight - 
                                                    this.state.mydata30[this.state.mydata30.length-1].weight)).toFixed(2) 
                                                    + " kg"
                                                : 
                                                "+" + (Math.abs((this.state.mydata30[0].weight - 
                                                    this.state.mydata30[this.state.mydata30.length-1].weight))).toFixed(2) 
                                                    + " kg"                                           
                                                :
                                                null 
                                            }
                                        </td>
                                        <td>
                                            {
                                                (this.state.mydata[0] !== undefined) &&
                                                (this.state.mydata[0].start === "true") &&
                                                (this.state.mydata[this.state.mydata.length-1] !== undefined)
                                                ?
                                                (this.state.mydata[0].weight - 
                                                this.state.mydata[this.state.mydata.length-1].weight) >=0
                                                ?
                                                "-" + ((this.state.mydata[0].weight - 
                                                    this.state.mydata[this.state.mydata.length-1].weight)).toFixed(2)
                                                     + " kg"
                                                : 
                                                "+" + (Math.abs((this.state.mydata[0].weight - 
                                                    this.state.mydata[this.state.mydata.length-1].weight))).toFixed(2)
                                                     + " kg"                                           
                                                :
                                                null
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="content-table average-table">
                                <caption><h1>Statistics</h1></caption>
                                <thead>
                                    <tr>
                                        <th>Start</th>
                                        <th>Current</th>
                                        <th>BMI</th>
                                        <th>Ideal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                (this.state.mydata[0] !== undefined) &&
                                                    (this.state.mydata[0].start === "true")
                                                ?
                                                this.state.mydata[0].weight + " kg"
                                                :
                                                null
                                            }  
                                        </td>
                                        <td>
                                            {
                                                this.state.mydata[this.state.mydata.length-1] !== undefined
                                                ?
                                                this.state.mydata[this.state.mydata.length-1].weight + " kg"
                                                :
                                                null
                                            }
                                        </td>
                                        <td>
                                            {
                                                (this.state.mydata[this.state.mydata.length-1] !== undefined)
                                                ?
                                                Math.round(
                                                    this.state.mydata[this.state.mydata.length-1].weight/
                                                    ((this.state.height/100)*(this.state.height/100))
                                                )
                                                :
                                                null
                                            }
                                            {' : '}
                                            {
                                                this.getBmi(
                                                    (this.state.mydata[this.state.mydata.length-1] !== undefined)
                                                ?
                                                Math.round(
                                                    this.state.mydata[this.state.mydata.length-1].weight/
                                                    ((this.state.height/100)*(this.state.height/100))
                                                )
                                                :
                                                null
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                this.state.gender === "female"
                                                ?
                                                Math.round((this.state.height - 110)*1.15) 
                                                + " kg"
                                                :
                                                Math.round((this.state.height - 100)*1.15) 
                                                + " kg"
                                            }
                                        </td>
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
                                        <th>Difference</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.mydata.map((item, i, array) =>
                                    <tr key={item.id}>
                                        {
                                            // Make boolean
                                           JSON.parse(item.start) ? <td>start</td> : <td></td>
                                        }
                                        <td>{item.date}</td>
                                        <td>{item.weight + " kg"}</td>
                                        {/* <td>{item.difference}</td> */}
                                        <td>
                                            {
                                                i===0  
                                                ?
                                                0 + " kg"
                                                //item.difference = 0
                                                :
                                                //item.difference=
                                                (array[i-1].weight-array[i].weight) >= 0 
                                                ? 
                                                "-" + (array[i-1].weight-array[i].weight).toFixed(2) + " kg"
                                                : 
                                                "+" + Math.abs((array[i-1].weight-array[i].weight)).toFixed(2) + " kg"
                                            }
                                        </td>
                                        {/* {console.log(array[0].difference)} */}
                                        {/* {console.log(this.state.mydata[2].weight)} */}

                                        <td>
                                            <button onClick={()=>this.editUserRecordClick(item.id)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={()=>this.deleteUserRecordClick(item.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    ).reverse()
                                    }
                                
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

export default CalkTrackRealisComponent
