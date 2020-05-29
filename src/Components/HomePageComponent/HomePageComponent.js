import React, { Component } from "react";
import MainSectionComponent from "../MainSectionComponent/MainSectionComponent";
import CalcTrackComponent from "../CalcTrackComponent/CalcTrackComponent";
import DietComponent from "../DietComponent/DietComponent";
import HeaderComponents from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

class HomePageComponent extends Component {
    render() {
        return (
            <div>
                <HeaderComponents />
                <MainSectionComponent />
                <CalcTrackComponent />
                <DietComponent />
                <FooterComponent />
            </div>
        );
    }
}

export default HomePageComponent;
