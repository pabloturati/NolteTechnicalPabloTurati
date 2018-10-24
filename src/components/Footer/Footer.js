import React, { Component } from "react";
import "./Footer.css";
import NolteLogo from "../../projectFiles/images/favicon.png";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <span>This is a technical test exercise prepared for Nolte</span>
        <img src={NolteLogo} width={30} alt="NolteLogo" />
      </footer>
    );
  }
}
