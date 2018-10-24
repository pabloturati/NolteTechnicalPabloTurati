import React, { Component } from "react";
import "./VenueCard.css";
import { genericImage } from "../../projectFiles/projectData";
import { Link } from "react-router-dom";

import { FSCred } from "../../projectFiles/projectData";

export default class VenueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      linkArr: []
    };
  }

  componentWillMount() {
    const { id } = this.props.venue.venue;
    const url = this.createPhotoURLRequest(id);
    this.getImageArr(url);
  }

  getImageArr(url) {
    fetch(url)
      .then(res => res.json())
      .then(r => {
        let linkArr = [];
        const photoArr = r.response.photos.items;
        photoArr.forEach(photo => {
          const link = this.joinFixes(photo.prefix, photo.suffix, "200", "200");
          linkArr.push(link);
        });
        this.setState({ linkArr, loading: false });
      });
  }

  joinFixes(prefix, suffix, w, h) {
    return prefix + w + "x" + h + suffix;
  }

  createPhotoURLRequest(venueId) {
    const { Id, Sec } = FSCred;
    return `https://api.foursquare.com/v2/venues/${venueId}/photos?client_id=${Id}&client_secret=${Sec}&v=20180323`;
  }

  render() {
    const { id, name, location } = this.props.venue.venue;
    const { formattedAddress } = location;

    const { linkArr, loading } = this.state;

    return (
      <Link to={`/details/${id}`}>
        <div key={id} className="venue_item">
          {loading && !linkArr && <img src={genericImage} alt={name} />}
          {!loading &&
            linkArr.length > 0 && <img src={linkArr[0]} alt={name} />}
          {!loading &&
            linkArr.length === 0 && <img src={genericImage} alt={name} />}
          <h3>{name}</h3>
          <div className="card_address_box">
            {formattedAddress.map((addressLine, i) => (
              <span key={i}>
                {addressLine}
                <br />
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }
}
