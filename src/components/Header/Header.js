import React, { Component } from "react";
import TopLogo from "../../projectFiles/images/logoWhite.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import NolteLogo from "../../projectFiles/images/favicon.png";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header_titles">
          <img src={NolteLogo} width={30} alt="NolteLogo" />
          <div>
            <h2>Nolte WebDev Test Pablo Turati</h2>
          </div>
        </div>
        <img src={TopLogo} alt="Foursquare" />
        <Link to="/">
          <h3>Find venues!</h3>
        </Link>
      </header>
    );
  }
}
