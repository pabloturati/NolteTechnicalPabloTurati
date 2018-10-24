import React, { Component } from "react";
import "./App.css";
import Container from "../Container/Container";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import ResultComponent from "../ResultComponent/ResultComponent";
import { baseURL } from "../../projectFiles/projectData";
import Footer from "../../components/Footer";
import { Switch, Route } from "react-router-dom";
import VenueDetails from "../VenueDetails/VenueDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = false;
    this.state = {
      toDashboard: false,
      resultsPerPage: 30,
      address: "",
      findMe: false,
      location: {
        lat: 19.4265068,
        lng: -99.1768341
      },
      venues: [],
      loading: true
    };
  }
  componentDidMount() {
    const url = this.buildURL();
    this.fetchVenues(url);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.state.location) {
      this.fetchVenues(this.buildURL());
    }
  }

  buildURL() {
    const { lat, lng } = this.state.location;
    const { resultsPerPage } = this.state;
    return baseURL + `&limit=${resultsPerPage}&v=20180323&ll=${lat},${lng}`;
  }

  //State modifiers from Map to Results
  setLocation(location) {
    this.setState({ location });
  }

  setCount(count) {
    this.setState({ resultsPerPage: count });
  }

  fetchVenues(url) {
    fetch(url)
      .then(response => response.json())
      .then(res => {
        const venues = res.response.groups[0].items;
        this.setState({ venues, loading: false });
      })
      .catch(e => console.log(e));
  }

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
            count={count => this.setCount(count)}
          />
          <Container
            findMe={this.state.findMe}
            findByAddress={this.state.address}
            getLocation={this.state.location}
            setLocation={location => this.setLocation(location)}
            venues={this.state.venues}
          />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            component={props => (
              <ResultComponent
                location={this.state.location}
                loading={this.state.loading}
                venues={this.state.venues}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/details/:venueId"
            component={props => <VenueDetails {...props} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
