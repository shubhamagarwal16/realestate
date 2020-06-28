import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/",
                search: `?redirectUrl=${props.location.pathname}&modal=open`
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
