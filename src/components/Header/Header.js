import React, { Component } from "react";
import TopLogo from "../../projectFiles/images/top_title.png";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>Nolte WebDev Test - Pablo Turati</h1>
        <img src={TopLogo} alt="Foursquare" />
      </header>
    );
  }
}
