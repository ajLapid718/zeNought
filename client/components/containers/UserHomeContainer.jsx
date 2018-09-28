import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserHomeView } from "../views";

// Smart container;
const UserHomeContainer = props => {
  const { email } = props;
  return <UserHomeView email={email} />;
};

// Map state to props;
const mapState = state => {
  return {
    email: state.user.email
  };
};

// Type check incoming props from Redux store;
UserHomeContainer.propTypes = {
  email: PropTypes.string
};

// Export our store-connected component, which will be composing our Routes component;
export default connect(mapState, null)(UserHomeContainer);
