import React from "react";
import Joi from "joi-browser";
import queryString from "query-string";

import Form from "../common/form";
import { Modal, Button } from "react-bootstrap";
import * as authService from "../../services/authService";
import * as commonService from "../../services/commonServices";

class LoginModal extends Form {
  state = {
    data: {
      emailPhone: "",
      password: ""
    },
    errors: {}
  };
  schema = {
    emailPhone: Joi.string()
      .required()
      .label("Email/Phone"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = await commonService.post(
        "/auth/user/login",
        this.state.data
      );
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        const user = authService.getCurrentUser();
        if (user) {
          this.props.setLoggedInUser(user);
          this.props.toggleLoginModal();
          let redirectUrl = "/users/dashboard";
          // if (this.props.location && this.props.location.search) {
          //   const { redirectUrl: queryParam } = queryString(
          //     this.props.location.search
          //   );
          //   console.log("queryParam", queryString(this.props.location.search));
          //   redirectUrl = queryParam;
          // }
          // this.props.history.push("/users/dasKshboard");
          console.log(redirectUrl, this.props.location.search);
          window.location = redirectUrl;
        }
      }
    } catch (error) {
      let errors = {};
      if (error && error.response && error.response.data)
        errors.emailPhone = error.response.data.message;
      this.setState({ errors });
    }
  };

  render() {
    const { toggle, toggleLoginModal } = this.props;
    return (
      <React.Fragment>
        <Modal show={toggle} onHide={toggleLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("Email / Phone Number", "emailPhone")}
              {this.renderInput("Password", "password", "password")}
              <input
                type="submit"
                disabled={this.validate()}
                value="Login"
                className="btn btn-success form-control"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleLoginModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LoginModal;
