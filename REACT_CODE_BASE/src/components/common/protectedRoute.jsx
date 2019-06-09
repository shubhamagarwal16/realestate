import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./../../services/authService";

const ProtectedRoute = ({ component: Component, user, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/",
                search: `?redirectUrl=${props.location.pathname}`,
                state: { loginModalToggle: true }
              }}
            />
          );
        return Component ? <Component user={user} {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
