import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { auth } from "../../thunks";
import { AuthFormView } from "../views";

// Smart container;
const AuthFormContainer = props => {
  const { name, displayName, error, handleSubmit } = props;
  return (
    <AuthFormView
      name={name}
      displayName={displayName}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

// Map state to props;
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

// Map state to props;
const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

// Type check incoming props from Redux store;
AuthFormContainer.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

// Export our store-connected components, which will be composing our Routes component;
export const Login = connect(mapLogin, mapDispatch)(AuthFormContainer);
export const Signup = connect(mapSignup, mapDispatch)(AuthFormContainer);
