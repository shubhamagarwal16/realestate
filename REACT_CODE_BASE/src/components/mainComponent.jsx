import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./common/header";
import Footer from "./common/footer";
import ProtectedRoute from "./common/protectedRoute";
import Home from "./home/home";
import Registration from "./users/registration";
import ViewProperty from "./property/viewProperty";
import UserDashboard from "./users/dashboard";
import AddProperty from "./property/addProperty";
import FindProperty from "./property/findProperty";
import PropertyListing from "./property/propertyListing";
import UserProfile from "./users/profile";

const MainComponent = props => {
  // console.log("MainComponent ", props);
  return (
    <React.Fragment>
      <Header {...props} />
      <Switch>
        <Route path="/property/view/:slug" component={ViewProperty} />
        <ProtectedRoute
          path="/users/dashboard"
          user={props.user}
          component={UserDashboard}
        />
        <ProtectedRoute
          path="/users/profile/edit"
          user={props.user}
          component={UserProfile}
        />
        {/* ----------------- PROPERTY --------------------- */}
        <ProtectedRoute
          path="/property/new"
          user={props.user}
          component={AddProperty}
        />
        <ProtectedRoute
          path="/property/search"
          user={props.user}
          component={FindProperty}
        />
        <ProtectedRoute
          path="/property/listing/:type"
          user={props.user}
          component={PropertyListing}
        />

        {/* ----------------- PROPERTY --------------------- */}
        <Route path="/sign-up" component={Registration} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default MainComponent;
