import React from "react";
import { connect } from "react-redux";

import { getCurrentUser } from "../../services/authService";

const CommonUIAddons = props => {
  const classes = getCurrentUser() ? "load-bar" : "load-bar load-bar-top0";
  return (
    <React.Fragment>
      {props.pageLoaderFlag && (
        <div className={classes}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      )}
    </React.Fragment>
  );
};

const addStateToProps = state => {
  return {
    pageLoaderFlag: state.common.isPageLoaderActive
  };
};

export default connect(addStateToProps)(CommonUIAddons);
