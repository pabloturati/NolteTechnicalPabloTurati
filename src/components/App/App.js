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
      //Control Panel + Map state
      address: "",
      findMe: false,
      location: {
        lat: 19.4265068,
        lng: -99.1768341
      }
    };
  }
  // componentDidMount() {
  //   this.fetchResults(this.buildURL());
  // }

  // componentDidUpdate(){

  // }

  //State modifiers from Map to Results
  setLocation(location) {
    this.setState({ location });
  }

  // fetchResults(url) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(res => {
  //       const venues = res.response.groups[0].items;
  //       this.setState({ venues, loading: false });
  //     })
  //     .catch(e => console.log(e));
  // }

  //State modifiers from ControlPanel to MAP
  findMe = () => {
    const findMe = !this.state.findMe;
    this.setState({ findMe });
  };
  setAddress = address => {
    this.setState({ address });
  };

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
        <ResultComponent location={this.state.location} />
      </div>
    );
  }
}

export default App;
