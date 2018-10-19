import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "../Map/Map";
import { mapsAPI } from "../../projectFiles/projectData";

export class Container extends Component {
  render() {
    const { findMe } = this.props;

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <Map
          google={this.props.google}
          centerAroundCurrentLocation={findMe}
          findByAddress={this.props.findByAddress}
          currentLocation={this.props.currentLocation}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: mapsAPI
})(Container);
