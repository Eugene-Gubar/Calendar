import React, { Component } from "react";
import Logout from "../Auth/Logout";

import PropTypes from "prop-types";

class NavBar extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="navigation-bar">
        <nav className="navbar">
          <Logout />
        </nav>
      </div>
    );
  }
}

export default NavBar;
