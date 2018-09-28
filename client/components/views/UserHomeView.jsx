import React from "react";
import PropTypes from "prop-types";

const UserHomeView = props => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

UserHomeView.propTypes = {
  email: PropTypes.string
};

export default UserHomeView;
