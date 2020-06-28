import React from "react";
import PropertyList from "../common/propertyList";
import { useSelector } from "react-redux";

const UserDashboard = (props) => {
  const [queryParams, setQueryParams] = React.useState('');
  const user = useSelector(store => store.user) || {};

  React.useEffect(() => {
    setQueryParam();
  }, []) // eslint-disable-line

  const setQueryParam = () => {
    const queryParams = user && user._id ? `?userId=${user._id}` : "";
    setQueryParams(queryParams);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h4 className="text-danger">Your recent Postings:</h4>
        <hr className="hr" />

        <PropertyList queryParams={queryParams} {...props} />
      </div>
    </React.Fragment>
  );
}

export default UserDashboard;
