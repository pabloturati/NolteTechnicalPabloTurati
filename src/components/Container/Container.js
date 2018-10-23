import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "../Map/Map";
import { mapsAPI } from "../../projectFiles/projectData";

export class Container extends Component {
  setLocation(location) {
    this.props.setLocation(location);
  }

  render() {
    const { findMe } = this.props;

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <Map
          google={this.props.google}
          findMe={findMe}
          findByAddress={this.props.findByAddress}
          getLocation={this.props.getLocation}
          setLocation={location => this.setLocation(location)}
          venues={this.props.venues}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: mapsAPI
})(Container);
