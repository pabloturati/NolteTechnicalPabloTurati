import React, { Component } from "react";

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.addressInpRef = React.createRef();
    this.findAddress = this.findAddress.bind(this);
  }

  findMe = () => {
    this.props.findMe();
  };

  findAddress = event => {
    if (event.key === "Enter") {
      const address = event.target.value;
      console.log("value is", address);
      this.props.setAddress(address);
    }
  };

  render() {
    return (
      <div>
        <h2>Find venues!</h2>
        <h3>Find venues by city or by Address</h3>
        <input
          type="text"
          ref={this.addressInpRef}
          placeholder="Address Finder"
          onKeyPress={e => this.findAddress(e)}
        />
        <h3>Find venues close to you!</h3>
        <button onClick={this.findMe} value="Find venues around me">
          Find me!
        </button>
      </div>
    );
  }
}
