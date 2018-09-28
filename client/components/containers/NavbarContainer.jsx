import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../thunks";
import { NavbarView } from "../views";

// Smart container;
const NavbarContainer = props => {
  const { handleClick, isLoggedIn } = props;
  return <NavbarView handleClick={handleClick} isLoggedIn={isLoggedIn} />;
};

// Map state to props;
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

// Type check incoming props from Redux store;
NavbarContainer.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

// Export our store-connected component, which will be composing our Routes component;
export default connect(mapState, mapDispatch)(NavbarContainer);
