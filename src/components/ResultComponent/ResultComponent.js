import React, { Component } from "react";
import { baseURL } from "../../projectFiles/projectData";
import { mapsAPI } from "../../projectFiles/projectData";

export default class ResultComponent extends Component {
  componentWillMount() {
    if (this.props.currentLocation) {
      const { lat, lng } = this.props.currentLocation;
      this.fetchResults(baseURL + `&v=20180323&ll=${lat},${lng}`);
    }
  }

  fetchResults(url) {
    fetch(url)
      .then(response => response.json())
      .then(venues => {
        console.log(venues);
      })
      .catch(e => console.log(e));
  }

  render() {
    console.log(mapsAPI);
    return (
      <div>
        <h1>hjkl</h1>
      </div>
    );
  }
}
