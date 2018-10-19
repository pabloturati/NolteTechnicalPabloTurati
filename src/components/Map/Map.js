import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.handleEvent = this.handleEvent.bind(this);
    this.markersArray = [];
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
    this.drawMarker();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.centerAroundCurrentLocation !==
      this.props.centerAroundCurrentLocation
    ) {
      console.log("fired 1");
      this.setup();
    }
    //If request is received (by prop) to find by address
    if (prevProps.findByAddress !== this.props.findByAddress) {
      console.log("fired 2");
      this.geocodeAddress(this.props.findByAddress);
    }
    if (prevProps.google !== this.props.google) {
      console.log("fired 3");
      this.loadMap();
    }
    //If coordinates change
    if (prevState.currentLocation !== this.state.currentLocation) {
      console.log("fired 4");
      this.recenterMap();
    }
    this.drawMarker();
  }

  recenterMap() {
    const { maps } = this.props.google;
    const { lat, lng } = this.state.currentLocation;

    if (this.map) {
      let center = new maps.LatLng(lat, lng);
      this.map.panTo(center);
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
        console.log(lat, lng);
        this.setState({
          currentLocation: {
            lat,
            lng
          }
        });
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
      const { lat, lng } = this.state.currentLocation;

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
        //console.log(lat, lng);
        this.setState({
          currentLocation: {
            lat,
            lng
          }
        });
      });
    }
  };

  handleDrag = event => {
    console.log(event.target._latlng);
    // this.map.panTo()
    this.drawMarker();
  };

  drawMarker() {
    this.clearOverlays();
    const { google } = this.props;
    const { lat, lng } = this.state.currentLocation;

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

  //NO Funciona bien
  handleEvent(evt) {
    let timeout;

    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      console.log(evt);
    }, 3000);
  }

  render() {
    //console.log(this.state.currentLocation);
    return (
      <div className="map" ref={this.mapRef}>
        Loading map...
      </div>
    );
  }
}

Map.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
  onMove: PropTypes.func,
  centerAroundCurrentLocation: PropTypes.bool,
  findByAddress: PropTypes.string
};

Map.defaultProps = {
  zoom: 14,
  // Mexico City
  initialCenter: {
    lat: 19.4265068,
    lng: -99.1768341
  },
  centerAroundCurrentLocation: false,
  findByAddress: "",
  onMove: function() {}
};
