import React, { Component } from "react";
import TopLogo from "../../projectFiles/images/logoWhite.svg";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header_titles">
          <h2>Nolte WebDev Test</h2>
          <h2>Pablo Turati</h2>
        </div>
        <img src={TopLogo} alt="Foursquare" />
      </header>
    );
  }
}
