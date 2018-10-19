import React, { Component } from "react";
import "./App.css";
import Container from "../Container/Container";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import ResultComponent from "../ResultComponent/ResultComponent";

class App extends Component {
  state = {
    findMe: false,
    address: "",
    currentLocation: {
      lat: "",
      lng: ""
    }
  };

  //State modifiers form Map to Results

  //State modifiers from ControlPanel to MAP
  findMe = () => {
    const findMe = !this.state.findMe;
    this.setState({ findMe });
  };
  setAddress = address => {
    this.setState({ address });
  };

  render() {
    console.log("findMe", this.state.findMe);
    console.log("address", this.state.address);
    return (
      <div className="App">
        <Header />
        <ControlPanel
          findMe={this.findMe}
          setAddress={address => this.setAddress(address)}
        />
        <Container
          findMe={this.state.findMe}
          findByAddress={this.state.address}
          currentLocation={this.state.currentLocation}
        />
        <ResultComponent currentLocation={this.state.currentLocation} />
      </div>
    );
  }
}

export default App;
