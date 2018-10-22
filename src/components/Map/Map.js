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
    this.drawMarker();
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
    this.drawMarker();
  }

  findMe() {
    if (navigator && navigator.geolocation) {
      console.log("going in");
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
      // const { lat, lng } = this.state.currentLocation;
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

      // console.log(this.map);

      this.map.addListener("dragend", e => {
        const lat = this.map.getCenter().lat();
        const lng = this.map.getCenter().lng();
        this.setLocation(lat, lng);
      });
    }
  };

  recenterMap() {
    const { maps } = this.props.google;
    const { lat, lng } = this.state.currentLocation;

    if (this.map) {
      let center = new maps.LatLng(lat, lng);
      this.map.panTo(center);
    }
  }

  setLocation(lat, lng) {
    const location = { lat, lng };
    this.props.setLocation(location);
  }

  drawMarker() {
    this.clearOverlays();
    const { google } = this.props;
    const { lat, lng } = this.props.getLocation;
    const location = new google.maps.LatLng(lat, lng);
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: "Got you!"
    });
    this.markersArray.push(marker);
    marker.addListener("click", e => {
      console.log(marker.getPosition().lat, marker.getPosition().lng);
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
  //initialCenter: PropTypes.object,
  //  findByAddress: PropTypes.string
};

Map.defaultProps = {
  zoom: 14
  // Mexico City
  // initialCenter: {
  //   lat: 19.4265068,
  //   lng: -99.1768341
  // }
};
