import React, { Component } from "react";
import "./VenueCard.css";
import { genericImage } from "../../projectFiles/projectData";
import { Link } from "react-router-dom";

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

  createPhotoURLRequest(id) {
    return `https://api.foursquare.com/v2/venues/${id}/photos?4b43ef23f964a52067ee25e3&client_id=B4VB3FI4MYM4XOON5MGQ0QPAFPLGKITPJQG3OQ03KK0OGB2M&client_secret=31H00P5SBRDADK5OYMN0LBCIELAPTOZHKHDWFFE5LVT0OZG5&v=20180323`;
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
          <span>{formattedAddress[0]}</span>
          <span>{formattedAddress[1]}</span>
          <span>{formattedAddress[2]}</span>
        </div>
      </Link>
    );
  }
}
