import React, { Component } from "react";
import "./signup.css";

import PropTypes from "prop-types";

import { reduxForm, Field } from "redux-form";

import { register } from "../../redux/actions/auth";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[\w-_]+@\w+.\w{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be more than 6 and less than 20 characters";
  }
  if (!values.repeat) {
    errors.repeat = "Required";
  } else if (values.repeat !== values.password) {
    errors.repeat = 'Must match the "Password" field';
  }
  return errors;
};

const input = ({
  id,
  input,
  name,
  label,
  type,
  meta: { touched, error, active }
}) => (
  <div className="signup__field">
    <label htmlFor={id}>
      <b>{label}</b>
    </label>
    <input
      className="signup__input"
      {...input}
      type={type}
      name={name}
      placeholder={label}
    />
    {!active &&
      touched &&
      (error && <span className="signup__error w3-red">{error}</span>)}
  </div>
);

class Signup extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submit: PropTypes.func
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="w3-modal-content block-signin"
        style={{ maxWidth: "600px" }}
      >
        <form
          id="signup"
          className="signup login-content w3-container"
          onSubmit={handleSubmit(register)}
        >
          <div className="imgcontainer w3-center">
            <img
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDggNTA4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDggNTA4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojODREQkZGOyIgY3g9IjI1NCIgY3k9IjI1NCIgcj0iMjU0Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGMTU0M0Y7IiBkPSJNNDQxLjIsMTkwLjhjMCwzLjItMC44LDYtMi44LDguOGMtOC44LTQuOC0xOS4yLTcuMi0zMC03LjJjLTExLjIsMC0yMS42LDItMzAsNy4yICBjLTEuNi0yLjgtMi44LTUuNi0yLjgtOC44YzAtMTIsMTQuOC0yMiwzMi44LTIyQzQyNi40LDE2OC44LDQ0MS4yLDE3OC44LDQ0MS4yLDE5MC44eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU4OyIgZD0iTTQ2NC44LDI1NC40YzAsMTIuNC0yLDI1LjItNS4yLDM3LjZIMzU3LjJjLTAuOC0zLjYtMS42LTYuOC0yLjQtMTAuNGM5LjYtMTcuMiwyMC00NS42LDE0LjgtNzYgIGMxMC05LjIsMjMuNi0xMy4yLDM4LjQtMTMuMkM0MzkuNiwxOTIuNCw0NjQuOCwyMDkuNiw0NjQuOCwyNTQuNHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0Y5QjU0QzsiIGQ9Ik00NDQuOCwzMjhjMCwwLDIuOCwxNi0xNS42LDMyLjRsLTU3LjYtMjhjMC40LTQuNCwxLjYtOC40LDMuMi0xMmM4LjgsMTYsMjAuOCwyNi44LDM0LDI2LjggIHMyNS4yLTExLjIsMzQtMjYuOEM0NDMuNiwzMjIuOCw0NDQuNCwzMjUuMiw0NDQuOCwzMjhMNDQ0LjgsMzI4eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNENEQkM0OyIgZD0iTTQ4NS42LDM1OC40Yy04LjgsMjAtMjAuNCwzOC40LTM0LDU1LjJsLTMuMi0xMC40YzItNiw5LjYtMzkuNiw0LjgtNjAuOEw0ODUuNiwzNTguNHoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTQ0OC40LDQwMy4ybC0xMi44LTQwbC02LjQtMy4yYzE4LjQtMTYuNCwxNS42LTMyLjQsMTUuNi0zMi40QzQ2Mi44LDM0MS42LDQ1MC44LDM5NS4yLDQ0OC40LDQwMy4yICAgeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNzIsMzI4Yy0wLjQsMS4yLTAuNCwyLjgtMC44LDQuNGwtMi40LTEuMkMzNjkuNiwzMzAsMzcwLjgsMzI4LjgsMzcyLDMyOHoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZEMDVCOyIgZD0iTTQ2Mi44LDI5Ni44Yy0zLjYsNy4yLTkuNiwxMC40LTEzLjYsOGMtOS4yLDIzLjYtMjQsNDItNDEuMiw0MnMtMzItMTguNC00MS4yLTQyICBjLTQsMi40LTEwLTEuMi0xMy42LThjLTEuNi0zLjItMi40LTYuNC0yLjgtOS4yYzItMi44LDQtNi40LDYtMTAuNGMwLjgsMCwxLjYsMCwyLjgsMC40bDAsMGwwLjQsMC40bDAsMGMwLTAuNC0xLjYtMTUuMiwzNy42LTMxLjIgIGMxNC01LjYsMjIuOC0xMiwyOC0xOGMyLDguOCw2LjgsMjEuMiwxOS42LDI2YzAsMCwxMiwyLjgsMTAuOCwyMi44bDAsMGMyLTAuOCw0LTAuOCw1LjYsMC40QzQ2Ni40LDI4MS4yLDQ2Ni44LDI4OS42LDQ2Mi44LDI5Ni44eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRTZFOUVFOyIgZD0iTTM0Mi44LDM5NS4yTDM0Mi44LDM5NS4yYy0wLjgsNS42LTIsMTEuNi0yLjgsMThsLTE0LTQyLjRDMzMyLjgsMzc2LjQsMzM5LjIsMzg0LDM0Mi44LDM5NS4yeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjlCNTRDOyIgZD0iTTMzOC44LDMwNGMwLDAsNC44LDI2LjQtMzMuNiw0OS4yTDI2MS42LDMzMmMtMTEuNi0xNS4yLTkuMi0yOC05LjItMjhzMCwwLTAuNCwwICBjMC0wLjQsMC0wLjgsMC40LTEuNmMxMiwxNC44LDI2LjgsMjQuNCw0My4yLDI0LjRzMzEuMi05LjYsNDMuMi0yNC40QzMzOC44LDMwMy4yLDMzOS4yLDMwMy42LDMzOC44LDMwNCAgQzMzOS4yLDMwNCwzMzkuMiwzMDQsMzM4LjgsMzA0eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojMkIzQjRFOyIgZD0iTTQ1MS42LDQxMy42Yy0yNCwyOS42LTU0LjQsNTMuNi04OS4yLDcwbC0yMi44LTcwLjRjMS4yLTYsMi0xMiwyLjgtMThjMC40LDAuOCwxMi44LTQ1LjYsNi03My42ICBsODYuNCw0MS42TDQ1MS42LDQxMy42eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzQyLjgsMzk1LjJjLTMuNi0xMS4yLTEwLTE5LjItMTYuOC0yNC40bC0yLjgtOC44bC0xNy42LTguNGMzOC40LTIyLjgsMzMuNi00OS4yLDMzLjYtNDkuMiAgIEMzNjIuOCwzMjIsMzQzLjIsMzk2LjQsMzQyLjgsMzk1LjJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MS42LDMzMmwtMTkuMi05LjJjMS42LTgsNC44LTE0LjgsMTAtMTguOEMyNTIuNCwzMDQsMjUwLDMxNi44LDI2MS42LDMzMnoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZEMDVCOyIgZD0iTTM1MC44LDI2OS4yYy01LjYsMTcuNi04LDI3LjItOCwyOC40bDAsMGMtMTIuOCwxNy4yLTI5LjIsMjkuMi00Ni44LDI5LjJjLTE2LjgsMC0zMi40LTEwLjQtNDQuOC0yNiAgYzAsMCwwLjQsMCwwLjQsMC40Yy0xMi0xNC44LTE0LjgtMzUuNi0xNC40LTUzLjZsMCwwYzQuNC0xMC40LDcuNi0yMi44LDkuNi0zNmMxNiwxMiw1Mi44LDEyLjgsNTIuOCwxMi44ICBjLTE4LjgtMy4yLTIxLjYtMTgtMjEuNi0xOGMzLjIsOS4yLDQ0LjgsMTQuOCw0NC44LDE0LjhDMzY1LjIsMjI3LjIsMzUwLjgsMjY5LjIsMzUwLjgsMjY5LjJ6Ii8+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzJCM0I0RTsiIGQ9Ik0yNTEuMiwzMDEuMmMwLDAtMTQtMTEuMi0yNS42LTMwLjhjMy42LTYsNy42LTE0LDExLjItMjIuOEMyMzYuNCwyNjUuNiwyMzkuMiwyODYuNCwyNTEuMiwzMDEuMnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMyQjNCNEU7IiBkPSJNMzQyLjgsMjk4YzAsMCwyLTEwLDgtMjguNGMwLDAsMTQuNC00Mi0yOC44LTQ4LjRjMCwwLTQxLjYtNS42LTQ0LjgtMTQuOGMwLDAsMy4yLDE1LjIsMjEuNiwxOCAgIGMwLDAtMzYuOC0wLjgtNTIuOC0xMi44YzIuNC0yMCwwLjgtNDItOS42LTY0YzguNC00LjQsMTkuMi02LDM0LTJjMCwwLDU4LjQtMjMuMiw4OC40LDI5LjZDMzkwLjgsMjMxLjYsMzUwLjgsMjkyLjgsMzQyLjgsMjk4eiIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiMzMjRBNUU7IiBkPSJNMzM0LjQsMjM5LjJIMzE0aC0yaC0zMi40aC0xLjJoLTIxLjZjLTYuNCwwLTExLjYsNS4yLTExLjYsMTEuNnY5LjZjMCw2LjQsNS4yLDExLjYsMTEuNiwxMS42aDIyLjQgIGMyLjgsMCw1LjYtMS4yLDcuNi0yLjhjMC44LTAuNCwxLjItMC44LDEuNi0xLjZjMS42LTMuNiw0LjQtNS42LDcuMi01LjZjMi44LDAsNS42LDIsNy4yLDUuNmMwLjQsMC44LDAuOCwxLjIsMS42LDEuNiAgYzIsMiw0LjgsMi44LDcuNiwyLjhoMjIuNGM2LjQsMCwxMS42LTUuMiwxMS42LTExLjZ2LTkuNkMzNDYsMjQ0LjQsMzQwLjgsMjM5LjIsMzM0LjQsMjM5LjJ6IE0yNTYuOCwyNjYuNGMtMy4yLDAtNi0yLjgtNi02di05LjYgIGMwLTMuMiwyLjgtNiw2LTZoMjEuNmgxLjJjMy4yLDAsNiwyLjgsNiw2djkuNmMwLDAuOCwwLDEuNi0wLjQsMi40Yy0wLjQsMC40LTAuNCwwLjgtMC44LDEuMmMtMS4yLDEuNi0yLjgsMi40LTQuOCwyLjRIMjU2Ljh6ICAgTTI5NS42LDI1NmMtMS42LDAtMy4yLDAuNC00LjgsMS4ydi02LjhjMC0yLjQtMC44LTQuNC0xLjYtNmgxMy4yYy0xLjIsMS42LTEuNiw0LTEuNiw2djYuOEMyOTguOCwyNTYuNCwyOTcuMiwyNTYsMjk1LjYsMjU2eiAgIE0zNDAuNCwyNjAuNGMwLDMuMi0yLjgsNi02LDZIMzEyYy0yLDAtMy42LTAuOC00LjgtMi40Yy0wLjQtMC40LTAuNC0wLjgtMC44LTEuMmMtMC40LTAuOC0wLjQtMS42LTAuNC0yLjR2LTkuNmMwLTMuMiwyLjgtNiw2LTZoMiAgaDIwLjRjMy4yLDAsNiwyLjgsNiw2VjI2MC40eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFNkU5RUU7IiBkPSJNNzcuNiw0MzYuNGMwLjQsMC44LDEuMiwxLjIsMS42LDEuNkM3OC44LDQzNy42LDc4LDQzNy4yLDc3LjYsNDM2LjRMNzcuNiw0MzYuNHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNFNkU5RUU7IiBkPSJNMTYwLDM1NS42Yy0wLjQsMC0wLjgsMC40LTEuMiwwLjRzLTAuOC0wLjQtMS4yLTAuNEgxNjB6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRTZFOUVFOyIgZD0iTTIxNCwzOTkuNmMtNC40LDI5LjItMTEuNiw2My4yLTIzLjYsMTAwLjRjLTI2LTYuOC01MC44LTE3LjYtNzIuOC0zMS42Yy02LjgtMjQuOC0xMS4yLTQ4LTE0LTY4LjggICBjMTIuOC00MCw1NS4yLTQzLjYsNTUuMi00My42UzIwMS42LDM1OS42LDIxNCwzOTkuNnoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojRjlCNTRDOyIgZD0iTTIwOS42LDI5MmMwLDAsNi40LDM2LTUwLjgsNjRoLTAuNGMtNTcuMi0yOC01MC44LTY0LTUwLjgtNjRzMCwwLTAuNCwwYzAtMC40LDAuNC0xLjIsMC40LTEuNiAgYzE0LDE3LjIsMzEuNiwyOC40LDUwLjgsMjguNHMzNi40LTExLjIsNTAuOC0yOC40QzIwOS42LDI5MS4yLDIxMCwyOTEuNiwyMDkuNiwyOTJDMjEwLDI5Mi40LDIxMCwyOTIsMjA5LjYsMjkyeiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1NEMwRUI7IiBkPSJNMTU5LjIsMzU2QzE1OS4yLDM1NiwxNTguOCwzNTYsMTU5LjIsMzU2Yy0wLjQsMC0wLjQsMC0wLjQsMEgxNTkuMnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM1NEMwRUI7IiBkPSJNMTc5LjIsMzYxLjZsLTYuOCwxOS42aC0yNi44bC02LjgtMTkuNmMxMS4yLTQuOCwyMC01LjYsMjAtNS42UzE2OCwzNTYuOCwxNzkuMiwzNjEuNnoiLz4KPC9nPgo8cGF0aCBzdHlsZT0iZmlsbDojODREQkZGOyIgZD0iTTE4OS4yLDQ5OS42bC0xNi44LTExOC40aC0yNi44TDEzMiw0NzYuOEMxNDkuNiw0ODYuNCwxNjguOCw0OTQuNCwxODkuMiw0OTkuNnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzMyNEE1RTsiIGQ9Ik0xMTcuNiw0NjguNGMtNDQtMjgtNzguOC02OS4yLTk4LjgtMTE4bDc3LjYtMzcuMmMtOCwzMy42LDYuOCw4OCw3LjIsODYuOCAgQzEwNi40LDQyMC40LDExMS4yLDQ0My4yLDExNy42LDQ2OC40eiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjA5LjYsMjkyYzAsMCw2LjQsMzYtNTAuOCw2NGMwLDAsNDIuOCwzLjIsNTUuMiw0My42QzIxNC44LDQwMC44LDIzOCwzMTMuNiwyMDkuNiwyOTJ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTEwOCwyOTJjLTI4LDIxLjItNC44LDEwOC44LTQuNCwxMDcuMmMxMi44LTQwLDU1LjItNDMuNiw1NS4yLTQzLjZDMTAxLjYsMzI4LjQsMTA4LDI5MiwxMDgsMjkyeiIvPgo8L2c+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRkQwNUI7IiBkPSJNMjIzLjYsMjUxLjJjLTcuMiwyMi05LjYsMzMuNi05LjYsMzMuNmMtMTQuOCwyMC40LTM0LDM0LTU1LjIsMzRjLTIwLDAtMzgtMTIuNC01Mi44LTMwLjhsMC40LDAuNCAgYy0zMS4yLTM4LjQtOS42LTEwOS4yLTkuNi0xMDkuMmMxNS42LDE3LjYsNjYsMTguOCw2NiwxOC44Yy0yMi0zLjYtMjUuNi0yMS4yLTI1LjYtMjEuMmMzLjYsMTAuOCw1Mi40LDE3LjIsNTIuNCwxNy4yICBDMjQwLjQsMjAyLDIyMy42LDI1MS4yLDIyMy42LDI1MS4yeiIvPgo8Zz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjRBNUU7IiBkPSJNMTI5LjYsMTA1LjZjMCwwLDY4LjgtMjcuNiwxMDMuNiwzNC44YzM3LjYsNjYuNC05LjYsMTM4LjgtMTkuMiwxNDQuNGMwLDAsMi40LTExLjYsOS42LTMzLjYgICBjMCwwLDE2LjgtNDkuMi0zMy42LTU2LjhjMCwwLTQ5LjItNi40LTUyLjQtMTcuMmMwLDAsMy42LDE3LjYsMjUuNiwyMS4yYzAsMC01MC40LTEuMi02Ni0xOC44YzAsMC0yMS42LDcwLjgsMTAsMTA5LjIgICBjMCwwLTU0LTQzLjItNDcuNi0xMTBDNTkuMiwxNzguOCw1Ni40LDg3LjIsMTI5LjYsMTA1LjZ6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzI0QTVFOyIgZD0iTTM2Mi40LDQ4My42QzMyOS42LDQ5OS4yLDI5Mi44LDUwOCwyNTQsNTA4Yy0yMiwwLTQzLjItMi44LTYzLjItOGMxMi0zNy4yLDE5LjItNzEuMiwyMy42LTEwMC40ICAgbDAsMGMwLjgsMCwxNC44LTUzLjYsNy4yLTg2LjhMMzIzLjIsMzYyTDM2Mi40LDQ4My42eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
              alt="Avatar"
              className="avatar"
            />
          </div>

          <div className="container">
            <Field
              component={input}
              id="signup_email"
              label="Email"
              type="email"
              name="email"
            />

            <Field
              component={input}
              id="signup_pswd"
              label="Password"
              type="password"
              name="password"
            />

            <Field
              component={input}
              id="signup_rpswd"
              label="Repeat password"
              type="password"
              name="repeat"
            />

            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "signup",
  validate
})(Signup);
