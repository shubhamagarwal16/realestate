import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Home from "./components/home/home";
import Registration from "./components/users/registration";
import ViewProperty from "./components/property/viewProperty";

import "./App.scss";
import "font-awesome/css/font-awesome.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/property/view/:slug" component={ViewProperty} />
          <Route path="/sign-up" component={Registration} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
