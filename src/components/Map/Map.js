import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.markersArray = [];
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps) {
    // If find me
    if (prevProps.findMe !== this.props.findMe) {
      this.findMe();
    }

    // If request is received (by prop) to find by address
    if (prevProps.findByAddress !== this.props.findByAddress) {
      this.geocodeAddress(this.props.findByAddress);
    }
    this.loadMap();
    if (this.props.venues !== []) {
      this.markMap(this.props.venues);
    }
  }

  markMap(markers) {
    this.clearOverlays();
    markers.forEach(marker => {
      const { lat, lng } = marker.venue.location;
      this.drawMarker(lat, lng, marker.venue.name);
    });
  }

  findMe() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(response => {
        const { latitude, longitude } = response.coords;
        this.setLocation(latitude, longitude);
      });
    }
  }
  geocodeAddress(address) {
    const { google } = this.props;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const lng =
          (results[0].geometry.viewport.b.b +
            results[0].geometry.viewport.b.f) /
          2;
        const lat =
          (results[0].geometry.viewport.f.b +
            results[0].geometry.viewport.f.f) /
          2;
        this.setLocation(lat, lng);
      } else {
        console.log(status);
      }
    });
  }
  loadMap = () => {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const node = this.mapRef.current;

      let { zoom } = this.props;
      const { lat, lng } = this.props.getLocation;

      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
      this.map.addListener("dragend", e => {
        const lat = this.map.getCenter().lat();
        const lng = this.map.getCenter().lng();
        this.setLocation(lat, lng);
      });
    }
  };

  setLocation(lat, lng) {
    const location = { lat, lng };
    this.props.setLocation(location);
  }

  drawMarker(lat, lng, title) {
    const { google } = this.props;
    const location = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: title
    });

    const infowindow = new google.maps.InfoWindow({
      content: title
    });
    this.markersArray.push(marker);
    marker.addListener("mouseover", e => {
      infowindow.open(this.map, marker);
    });
    marker.addListener("mouseout", e => {
      infowindow.close();
    });
  }

  clearOverlays() {
    for (var i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(null);
    }
    this.markersArray.length = 0;
  }

  handleMarkerClick(e) {
    console.log(e);
  }

  render() {
    console.log(this.props.venues);
    return (
      <div className="map" ref={this.mapRef}>
        Loading map...
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number
};

Map.defaultProps = {
  zoom: 16
};
