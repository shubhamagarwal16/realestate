import React from "react";

const ViewProperty = ({ match }) => {
  return (
    <React.Fragment>
      slug:
      {match.params.slug}
    </React.Fragment>
  );
};

export default ViewProperty;
