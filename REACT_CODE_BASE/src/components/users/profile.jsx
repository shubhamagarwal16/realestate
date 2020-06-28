import React from "react";
import * as moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUserData } from "../../services/authService";

const UserProfile = () => {
  const [userData, setUserData] = React.useState({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      dispatch({
        type: "TOGGLE_PAGELOADER", value: true
      })
      const userData = await getUserData();
      setUserData(userData);
      dispatch({
        type: "TOGGLE_PAGELOADER", value: false
      })
    })();
  }, []); // eslint-disable-line

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-right mt-2">
            {/* /users/profile/edit" */}
            <Link
              to="/users/profile/edit"
              // to={{
              //   pathname: "/users/profile/edit",
              //   hash: "#zxv",
              //   state: { isProfileEdit: true }
              // }}
              className="btn btn-primary btn-sm"
            >
              Edit
            </Link>
          </div>
          <div className="mt-2 col-md-4 text-right">
            <b>Full Name :</b>
          </div>
          <div className="mt-2 col-md-6">
            <span>
              {(userData.fname || "") + " " + (userData.lname || "")}
              &nbsp;
              {userData.isAdmin && (
                <span className="badge badge-primary"> Admin</span>
              )}
            </span>
          </div>
          <div className="mt-2 col-md-4 text-right">
            <b>Email Address :</b>
          </div>
          <div className="mt-2 col-md-6">
            <span>{userData.email || ""}</span> &nbsp;
            <button className="btn btn-secondary btn-sm">
              Change Password
            </button>
          </div>
          <div className="mt-2 col-md-4 text-right">
            <b>Phone Number :</b>
          </div>
          <div className="mt-2 col-md-6">
            <span>{userData.phoneNo || ""}</span>
          </div>
          <div className="mt-2 col-md-4 text-right">
            <b>Location :</b>
          </div>
          <div className="mt-2 col-md-6">
            <span>
              {((userData.city && userData.city.name) || "") +
                ", " +
                ((userData.state && userData.state.name) || "")}
            </span>
          </div>
          <div className="mt-2 col-md-4 text-right">
            <b>Pincode :</b>
          </div>
          <div className="mt-2 col-md-6">
            <span>{userData.pincode || ""}</span>
          </div>
          <div className="col-md-12 text-right mt-2">
            <small>Last Updated: </small>
            <small>
              {moment(userData.updatedOn).format("DD-MM-YYYY hh:mm:ss A") ||
                ""}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;