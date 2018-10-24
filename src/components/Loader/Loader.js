import React, { Component } from "react";
import "./Loader.css";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <h2>Loading funiture...</h2>
        <h2>Give us a sec while do the heavy lifting.</h2>
        <div className="lds-circle" />
      </div>
    );
  }
}
