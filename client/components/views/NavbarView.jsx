import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Presentational component;
const NavbarView = props => {
  const { handleClick, isLoggedIn } = props;
  return (
    <div>
      <h1>NAMEOFAPP</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in*/}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in*/}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

// Type check incoming props from smart container;
NavbarView.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

// Export our presentational component, which will compose our smart container component;
export default NavbarView;
