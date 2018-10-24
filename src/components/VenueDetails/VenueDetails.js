import React, { Component } from "react";
//import Social from "../Social/Social";
import Loader from "../Loader/Loader";

import { FSCred } from "../../projectFiles/projectData";
//import { deflateRaw } from "zlib";

export default class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      details: null
    };
  }

  componentWillMount() {
    console.log("mount");
    const id = this.props.match.params.venueId;
    const url = this.buildURL(id);
    this.fetchDetails(url);
  }

  buildURL(venueId) {
    console.log("build url");
    const { Id, Sec } = FSCred;
    return `https://api.foursquare.com/v2/venues/${venueId}?client_id=${Id}&client_secret=${Sec}&v=20180323`;
  }
  fetchDetails(url) {
    console.log("fetching data");
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
    console.log(details);

    return (
      <React.Fragment>
        {loading && <Loader />}
        {!loading &&
          details !== null && (
            <div>
              NOT NULL
              {details.venue.name}
              <div>
                <h1>{details.venue.name}</h1>
                <p>{details.venue.description}</p>
                <div className="detail_address_box">
                  {details.venue.location.formattedAddress.map(
                    (addressLine, i) => (
                      <span key={i}>
                        {addressLine}
                        <br />
                      </span>
                    )
                  )}
                </div>
                {/* <span>{details.venue.cannonicalURL}</span> */}
                {/* <span>{details.venue.price.tier}</span>  */}
              </div>
            </div>
          )}
      </React.Fragment>
    );
  }
}
