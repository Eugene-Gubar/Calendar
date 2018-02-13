import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "./redux/actions/auth";

class App extends Component {
  static propTypes = {
    auth: PropTypes.func,
    user: PropTypes.object
  };

  componentDidMount() {
    const { auth, user } = this.props;
    const token = localStorage.getItem("token");

    if (token && !user.authenticated) return auth(token);
  }

  render() {
    const token = localStorage.getItem("token");
    if (!token) return <Redirect to="/login" />;

    const { user } = this.props;
    const { authenticated } = user;

    if (!authenticated) {
      return (
        <div className="waiting">
          <div className="waiting__animation loader"></div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <div className="wrap-container">
            <h2>User logged!</h2>
            <Home />
          </div>
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    user: state.userAuth
  }),
  { auth }
)(App);
