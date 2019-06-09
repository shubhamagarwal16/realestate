import React, { Component } from "react";
import { Route } from "react-router-dom";
import { getCurrentUser } from "./services/authService";

import MainComponent from "./components/mainComponent";
import "./App.scss";
import "font-awesome/css/font-awesome.css";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <Route
          path="/"
          render={props => <MainComponent user={this.state.user} {...props} />}
        />
      </React.Fragment>
    );
  }
}

export default App;
