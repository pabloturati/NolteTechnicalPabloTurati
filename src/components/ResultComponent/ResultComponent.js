import React, { Component } from "react";
import "./ResultComponent.css";
import Placeholder from "../../projectFiles/images/Placeholder.png";

export default class ResultComponent extends Component {
  getPhotoSrc(url) {
    fetch(url)
      .then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
  }

  createPhotoURL(id) {
    return `https://api.foursquare.com/v2/venues/${id}/photos?4b43ef23f964a52067ee25e3&client_id=B4VB3FI4MYM4XOON5MGQ0QPAFPLGKITPJQG3OQ03KK0OGB2M&client_secret=31H00P5SBRDADK5OYMN0LBCIELAPTOZHKHDWFFE5LVT0OZG5&v=20180323`;
  }

  drawVenue(item) {
    const { location, name, categories, id } = item.venue;
    const { formattedAddress, lat, lng } = location;
    // const catName = categories[0].name;

    //const url = this.createPhotoURL(id);
    //this.getPhotoSrc(url);
    return (
      <div key={id} className="venue_item">
        <img src={Placeholder} alt={name} />
        <h3>{name}</h3>
        <span>{formattedAddress[0]}</span>
        <span>{formattedAddress[1]}</span>
        <div className="social">
          <div
            className="fb-share-button"
            data-href="https://developers.facebook.com/docs/plugins/"
            data-layout="button"
            data-size="large"
            data-mobile-iframe="true"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
              className="fb-xfbml-parse-ignore"
            >
              <i className="fab fa-facebook-square" />
            </a>
          </div>
          <a
            className="twitter-share-button"
            href="https://twitter.com/intent/tweet"
          >
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    );
  }
  render() {
    //const url = this.createPhotoURL("4b43ef23f964a52067ee25e3");
    // console.log(this.getPhotoSrc(url));

    const { loading, venues } = this.props;

    return (
      <div className="venue_list">
        {loading && <h1>Loading</h1>}
        {!loading && venues.map(item => this.drawVenue(item))}
      </div>
    );
  }
}
