import React, { Component } from 'react'
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import LogRegComponent from "./LogRegComponent/LogRegComponent";
import HomePageComponent from './HomePageComponent/HomePageComponent';
import CalkTrackRealisComponent from './CalkTrackRealisComponent/CalkTrackRealisComponent'
import ContactComponent from './ContactComponent/ContactComponent'
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent'
import AdminComponent from '../Components/AdminComponent/AdminComponent'
import AuthenticatedRoute from '../Components/AuthenticationComponents/AuthenticatedRoute'
import AdminAddUserComponent from '../Components/AdminComponent/AdminAddUserComponent'
import AdminEditUserComponent from '../Components/AdminComponent/AdminEditUserComponent'
import CalkTrackRealisEditComponent from '../Components/CalkTrackRealisComponent/CalkTrackRealisEditComponent'
import CalkTrackRealisAddComponent from '../Components/CalkTrackRealisComponent/CalkTrackRealisAddComponent'
import RecipeComponent from '../Components/RecipeComponent/RecipeComponent'

class MainComponent extends Component {
  render() {
    return (
      <div>
          <Router>
            <Switch>
                <Route path="/" exact component={HomePageComponent} />
                <Route path="/sign-in" component={LogRegComponent}/>
                <AuthenticatedRoute path="/track/edit/:id" component={CalkTrackRealisEditComponent}/>
                <AuthenticatedRoute path="/track/add/:userId" component={CalkTrackRealisAddComponent}/>
                <AuthenticatedRoute path="/track/:email" component={CalkTrackRealisComponent}/>
                <Route path="/contact" component={ContactComponent} />
                <Route path="/recipe" component={RecipeComponent} />
                <AuthenticatedRoute path="/admin/edit/:email" component={AdminEditUserComponent} />
                           {/* this.props.match.params.email in CalkTrackRealisComponent */}
                <AuthenticatedRoute path="/admin/add" component={AdminAddUserComponent} />
                <AuthenticatedRoute path="/admin" component={AdminComponent} />
                {/* <AuthenticatedRoute path="/add" component={AdminAddUserComponent} /> */}                
                <Route component={ErrorComponent} />
            </Switch>
          </Router>       
      </div>
    )
  }
}

export default MainComponent
