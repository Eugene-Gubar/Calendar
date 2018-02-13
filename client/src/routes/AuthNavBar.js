import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class AuthNavBar extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="navigation-auth__links">
        <nav className="navbar w3-left">
          <NavLink to="/login">
            <button
              className="w3-button w3-green w3-large"
              style={{ width: "auto" }}
            >
              Login
            </button>
          </NavLink>
          &nbsp;
          <NavLink to="/register">
            <button
              className="w3-button w3-green w3-large"
              style={{ width: "auto" }}
            >
              Register
            </button>
          </NavLink>
        </nav>
      </div>
    );
  }
}

export default AuthNavBar;
