import React, { Component } from "react";
import "./ResultComponent.css";
import VenueCard from "../VenueCard/VenueCard";

export default class ResultComponent extends Component {
  render() {
    const { loading, venues } = this.props;
    return (
      <div className="venue_list">
        {loading && <h1>Loading</h1>}
        {!loading &&
          venues &&
          venues.map(venue => <VenueCard venue={venue} key={venue.venue.id} />)}
      </div>
    );
  }
}
