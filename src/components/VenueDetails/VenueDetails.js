import React, { Component } from "react";
import Social from "../Social/Social";
import Loader from "../Loader/Loader";
import { FSCred } from "../../projectFiles/projectData";
import "./VenueDetail.css";
import { genericImage } from "../../projectFiles/projectData";

export default class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      details: null,
      linkArr: []
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
        const linkArr = this.props.location.state;
        const details = response.response;
        this.setState({ details, linkArr, loading: false });
      })
      .catch(e => console.log(e));
  }

  setLocation(location) {
    this.props.setLocation(location);
  }

  render() {
    const { loading, details } = this.state;

    //Pin Image
    let pinImage;
    if (this.state.linkArr.length === 0) {
      pinImage = genericImage;
    } else {
      pinImage = this.state.linkArr[0];
    }
    return (
      <React.Fragment>
        {loading && <Loader />}
        {!loading &&
          details !== null && (
            <section className="venue_detail">
              <h1>{details.venue.name}</h1>
              <div className="photo_section">
                {this.state.linkArr.length > 0 &&
                  this.state.linkArr.map((photo, index) => {
                    return (
                      <img
                        className="venue_photo"
                        key={index}
                        src={photo}
                        alt={details.venue.name}
                      />
                    );
                  })}
                {/* Fallback if there are no images */}
                {this.state.linkArr.length === 0 && (
                  <img
                    className="venue_photo"
                    src={genericImage}
                    alt={details.venue.name}
                  />
                )}
              </div>
              <div className="generalInfo">
                {details.venue.description && (
                  <p>{details.venue.description}</p>
                )}
                <div className="detail_address_box">
                  <span className="bold">Address:</span>
                  {details.venue.location.formattedAddress.map(
                    (addressLine, i) => (
                      <span key={i}>
                        {addressLine}
                        <br />
                      </span>
                    )
                  )}
                </div>
                <div className="externalLinks">
                  <span className="bold">External links</span>
                  <a
                    href={details.venue.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Foursquare Site
                  </a>
                  {details.venue.url && (
                    <a
                      href={details.venue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit the venue's website
                    </a>
                  )}
                </div>{" "}
                {details.venue.price && (
                  <div>
                    {details.venue.price.currency} {}
                    <span className="bold">Price Tier:</span>{" "}
                    {details.venue.price.tier} - {details.venue.price.message}
                  </div>
                )}
                {
                  <div className="popularDetails">
                    {!details.venue.popular.isOpen &&
                      details.venue.popular.isOpen !== null && (
                        <span className="venueStatus isClosed">
                          {" "}
                          THIS VENUE IS CURRENTLY CLOSED{" "}
                        </span>
                      )}
                    {details.venue.popular.isOpen &&
                      details.venue.popular.isOpen !== null && (
                        <span className="venueStatus isOpen">
                          {" "}
                          THIS VENUE IS CURRENTLY OPEN{" "}
                        </span>
                      )}
                  </div>
                }
                {details.venue.popular.timeframes.length > 0 && (
                  <div className="dailyHours">
                    <h3>Venue Hours</h3>
                    {details.venue.popular.timeframes.length > 0 &&
                      details.venue.popular.timeframes.map((e, index) => (
                        <div key={index} className="dayOpen">
                          {e.days} {e.open.map(s => s.renderedTime + " ")}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <Social
                shareURL={details.venue.canonicalUrl}
                pinImage={pinImage}
                venueName={details.venue.name}
                description={details.venue.description}
              />
            </section>
          )}
      </React.Fragment>
    );
  }
}
