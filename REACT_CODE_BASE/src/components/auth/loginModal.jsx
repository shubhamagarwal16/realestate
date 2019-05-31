import React from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "../common/form";
import Joi from "joi-browser";
import { default as http } from "axios";

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
    console.log("submitted", this.state.data);
    const { data } = await http.post(
      "http://localhost:8080/api/auth/user/login",
      this.state.data
    );
    console.log(data);
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
