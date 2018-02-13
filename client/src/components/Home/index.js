import React, { Component } from "react";
import "./index.css";
import NavBar from "../NavBar";

import Day from "../Day";

import PropTypes from "prop-types";

class Home extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="home-content">
        <div className="wrap-container">
          <NavBar />
          <h1>Home</h1>
          <Day />
        </div>
      </div>
    );
  }
}

export default Home;
