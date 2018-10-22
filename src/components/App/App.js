import React, { Component } from "react";
import "./App.css";
import Container from "../Container/Container";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import ResultComponent from "../ResultComponent/ResultComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = false;
    this.state = {
      findMe: false,
      address: "",
      location: {
        lat: 19.4265068,
        lng: -99.1768341
      }
    };
  }
  //State modifiers form Map to Results
  setLocation(location) {
    this.setState({ location });
  }

  //State modifiers from ControlPanel to MAP
  findMe = () => {
    const findMe = !this.state.findMe;
    this.setState({ findMe });
  };
  setAddress = address => {
    this.setState({ address });
  };

  show() {}

  render() {
    return (
      <div className="App">
        <Header />
        <div className="map_control">
          <ControlPanel
            findMe={this.findMe}
            setAddress={address => this.setAddress(address)}
          />
          <Container
            findMe={this.state.findMe}
            findByAddress={this.state.address}
            getLocation={this.state.location}
            setLocation={location => this.setLocation(location)}
          />
        </div>
        <ResultComponent currentLocation={this.state.location} />
      </div>
    );
  }
}

export default App;
