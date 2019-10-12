import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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
import ProfileEdit from "./users/profileEdit";

const MainComponent = props => {
  // console.log("MainComponent ", props);
  return (
    <React.Fragment>
      <Header {...props} />
      <div className="contentArea pt-5 pb-5">
        <Switch>
          <Route path="/property/view/:slug" component={ViewProperty} />
          <ProtectedRoute
            path="/users/dashboard"
            user={props.user}
            component={UserDashboard}
          />
          <ProtectedRoute
            path="/users/profile/edit"
            exact
            user={props.user}
            component={ProfileEdit}
          />
          <ProtectedRoute
            path="/users/profile"
            exact
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
            exact
            user={props.user}
            component={PropertyListing}
          />
          <Redirect from="/property/listing/" to="/property/listing/all" />

          {/* ----------------- PROPERTY --------------------- */}
          <Route path="/sign-up" component={Registration} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default MainComponent;
