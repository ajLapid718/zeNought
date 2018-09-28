import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Signup, UserHomeContainer } from "./components/containers";
import { me } from "./thunks";

// Smart container;
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        // Routes placed within this section are available to all visitors
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn && (
          <Switch>
            // Routes placed within this section are only available after
            logging in
            <Route path="/home" component={UserHomeContainer} />
          </Switch>
        )}

        // Displays our Login component as a fallback
        <Route component={Login} />
      </Switch>
    );
  }
}

// Map state to props;
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// Type check incoming props from Redux store;
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

// Export our store-connected routes, which will compose our main app component;
export default withRouter(connect(mapState, mapDispatch)(Routes));
