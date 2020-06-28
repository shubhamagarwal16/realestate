import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import "./App.css";
import "font-awesome/css/font-awesome.css";
import http from './services/httpService';
import { Modal, Alert } from 'react-bootstrap'

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import ProtectedRoute from "./components/common/protectedRoute";
import Home from "./components/home/home";
import Registration from "./components/users/registration";
import ViewProperty from "./components/property/viewProperty";
import UserDashboard from "./components/users/dashboard";
import AddProperty from "./components/property/addProperty";
import FindProperty from "./components/property/findProperty";
import PropertyListing from "./components/property/propertyListing";
import UserProfile from "./components/users/profile";
import ProfileEdit from "./components/users/profileEdit";
import { getCurrentUser } from "./services/authService";
import { useDispatch } from "react-redux";

const Routes = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const user = getCurrentUser();
    dispatch({
      type: "STORE_USER", user
    })
  }, []) // eslint-disable-line

  return (
    <>
      <Header {...props} />
      <div className="contentArea pt-5 pb-5">
        <Switch>
          <Route path="/property/view/:slug" component={ViewProperty} />
          <ProtectedRoute path="/users/dashboard" component={UserDashboard}
          />
          <ProtectedRoute
            path="/users/profile/edit" exact component={ProfileEdit}
          />
          <ProtectedRoute
            path="/users/profile" exact component={UserProfile}
          />
          {/* ----------------- PROPERTY --------------------- */}
          <ProtectedRoute
            path="/property/new" component={AddProperty}
          />
          <ProtectedRoute
            path="/property/search" component={FindProperty}
          />
          <ProtectedRoute
            path="/property/listing/:type" exact component={PropertyListing}
          />
          <Redirect from="/property/listing/" to="/property/listing/all" />

          {/* ----------------- PROPERTY --------------------- */}
          <Route path="/sign-up" component={Registration} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

const WithContainer = withRouter(Routes);

const App = (props) => {

  const [showModel, setShowModel] = React.useState(false);

  const checkServerStatus = () => {
    const url = `${process.env.REACT_APP_BASE_URL}`.split('/api')[0];
    http.get(url)
      .then(response => {
        if (response && response.data) {
          return true
        }
        setShowModel(true);
        return false
      })
      .catch(error => {
        console.log(error)
        setShowModel(true);
        return false
      })
  }

  return (
    <>
      {checkServerStatus()}
      <WithContainer />

      <Modal show={showModel} onHide={() => setShowModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            Their seems to be an issue with the server, try <a href="/">reloading</a>.
          </Alert>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default App;