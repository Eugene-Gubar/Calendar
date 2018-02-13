import React, { Component } from "react";
import "./index.css";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";

import { Redirect } from "react-router";
import { Route } from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import AuthNavBar from "../../routes/AuthNavBar";

class Auth extends Component {
  static propTypes = {
    auth: PropTypes.func,
    user: PropTypes.object
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const { auth, user } = this.props;
    const { authenticated } = user;

    if (token && !authenticated) auth(token);
  }

  render() {
    const token = localStorage.getItem("token");
    const { authenticated } = this.props.user;

    if (token && !authenticated) {
      return (
        <div className="waiting">
          <div className="waiting__animation loader"></div>
        </div>
      );
    }

    if (authenticated) return <Redirect to="/" />;

    return (
      <main className="main-content">
        <div className="wrap-container">
          <div className="auth">
            <h1>App</h1>
            <AuthNavBar />
            <Route exact path="/login" render={this.getSignin} />
            <Route exact path="/register" render={this.getSignup} />
          </div>
        </div>
      </main>
    );
  }

  getSignin = () => <Signin />;
  getSignup = () => <Signup />;
}

export default connect(
  state => ({
    user: state.userAuth
  }),
  { auth }
)(Auth);
