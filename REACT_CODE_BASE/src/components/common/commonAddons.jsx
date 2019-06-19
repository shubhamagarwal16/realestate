import React from "react";

const CommonUIAddons = ({ pageLoaderFlag }) => {
  console.log("common ", pageLoaderFlag);
  return (
    <React.Fragment>
      {pageLoaderFlag && (
        <div className="load-bar">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
      )}
    </React.Fragment>
  );
};

export default CommonUIAddons;
