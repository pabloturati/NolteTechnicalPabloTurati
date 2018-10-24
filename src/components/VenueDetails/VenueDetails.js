import React, { Component } from "react";
import Social from "../Social/Social";
import Loader from "../Loader/Loader";

export default class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      details: {}
    };
  }

  componentWillMount() {
    const id = this.props.match.params.venueId;
    const url = this.buildURL(id);
    this.fetchDetails(url);
  }

  buildURL(id) {
    return `https://api.foursquare.com/v2/venues/${id}?client_id=B4VB3FI4MYM4XOON5MGQ0QPAFPLGKITPJQG3OQ03KK0OGB2M&client_secret=31H00P5SBRDADK5OYMN0LBCIELAPTOZHKHDWFFE5LVT0OZG5&v=20180323`;
  }
  fetchDetails(url) {
    fetch(url)
      .then(res => res.json())
      .then(response => {
        const details = response.response;
        this.setState({ details, loading: false });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { loading, details } = this.state;
    // const { name, location, canonicalUrl, price } = this.state.details.venue;

    return (
      <React.Fragment>
        {loading && <Loader />}
        {!loading && (
          <div>
            {/* <h1>{details.name}</h1> */}
            {/* <h2>{details.location}</h2>
              <span>{details.cannonicalURL}</span>
              <span>{details.price.tier}</span> */}
            <Social />
          </div>
        )}
      </React.Fragment>
    );
  }
}
