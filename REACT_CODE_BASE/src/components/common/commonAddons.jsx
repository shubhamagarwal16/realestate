import React from "react";
import { getCurrentUser } from "../../services/authService";

const CommonUIAddons = ({ pageLoaderFlag }) => {
  const classes = getCurrentUser() ? "load-bar" : "load-bar load-bar-top0";
  return (
    <React.Fragment>
      {pageLoaderFlag && (
        <div className={classes}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      )}
    </React.Fragment>
  );
};

export default CommonUIAddons;
