import React, { Component } from "react";
import { baseURL } from "../../projectFiles/projectData";
import { mapsAPI } from "../../projectFiles/projectData";
import "./ResultComponent.css";

export default class ResultComponent extends Component {
  state = {
    venues: [],
    loading: true
  };
  componentWillMount() {
    if (this.props.currentLocation) {
      const { lat, lng } = this.props.currentLocation;
      this.fetchResults(baseURL + `&v=20180323&ll=${lat},${lng}`);
    }
  }

  fetchResults(url) {
    fetch(url)
      .then(response => response.json())
      .then(res => {
        const venues = res.response.groups[0].items;
        this.setState({ venues, loading: false });
      })
      .catch(e => console.log(e));
  }

  drawVenue(item) {
    const { location, name, categories, id } = item.venue;
    const { formattedAddress, lat, lng } = location;
    const catName = categories[0].name;
    // console.log(formattedAddress);

    return (
      <div key={id} className="venue_item">
        <h3>{name}</h3>
        <span>{formattedAddress}</span>
        <span>{lat}</span>
        <span>{lng}</span>
        <span>{catName}</span>
        {/* {console.log(lat, lng)} */}
      </div>
    );
  }

  render() {
    const { loading, venues } = this.state;
    return (
      <div className="venue_list">
        {loading && <h1>Loading</h1>}
        {!loading && venues.map(item => this.drawVenue(item))}
      </div>
    );
  }
}
