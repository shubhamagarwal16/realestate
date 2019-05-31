import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/common/header";
import Home from "./components/home/home";
import Footer from "./components/common/footer";
import Registration from "./components/users/registration";

import "./App.scss";
import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route to="/sign-up" component={Registration} />
        <Route to="/" exact component={Home} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
