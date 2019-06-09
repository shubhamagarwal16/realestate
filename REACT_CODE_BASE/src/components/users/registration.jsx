import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";

class Registration extends Form {
  state = {
    data: {
      fname: "",
      lname: "",
      email: "",
      phoneNo: "",
      password: "",
      cPassword: ""
    },
    errors: {}
  };

  schema = {
    fname: Joi.string()
      .required()
      .label("First Name"),
    lname: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    phoneNo: Joi.number()
      .required()
      .label("Phone Number"),
    password: Joi.string()
      .required()
      .label("Password"),
    cPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "password does not match" } } })
  };

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <h3>Fill the following details to register as a new user-</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col-md-6">
                {this.renderInput("", "fname", "input", "Enter First Name")}
              </div>
              <div className="col-md-6">
                {this.renderInput("", "lname", "input", "Enter Last Name")}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                {this.renderInput("", "email", "email", "Enter Email Address")}
              </div>
              <div className="col-md-6">
                {this.renderInput(
                  "",
                  "phoneNo",
                  "number",
                  "Enter Phone Number"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                {this.renderInput("", "password", "password", "Enter Password")}
              </div>
              <div className="col-md-6">
                {this.renderInput(
                  "",
                  "cPassword",
                  "password",
                  "Re-enter Password"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md">
                <input
                  type="submit"
                  disabled={this.validate()}
                  className="btn btn-success form-control"
                  value="Sign up"
                />
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Registration;
