import React from "react";
import "./logout.css";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

const Logout = ({ logout }) => {
  return (
    <div className="app-logout">
      <button className="app-logout__button" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func
};

export default connect(null, { logout })(Logout);
