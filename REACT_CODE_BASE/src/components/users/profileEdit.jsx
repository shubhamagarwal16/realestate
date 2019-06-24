import React from "react";
import Joi from "joi-browser";

import Form from "../common/form";
import * as commonService from "../../services/commonServices";
import { getUserData } from "../../services/authService";

class ProfileEdit extends Form {
  state = {
    data: {
      _id: "",
      fname: "",
      lName: "",
      email: "",
      phoneNo: "",
      state: "",
      city: "",
      pincode: ""
    },
    errors: {},
    stateList: [],
    cityList: []
  };

  schema = {
    fname: Joi.string()
      .required()
      .label("First Name"),
    lName: Joi.string()
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
    cPassword: Joi.string()
      // .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password"),
    // .options({ language: { any: { allowOnly: "password does not match" } } }),
    state: Joi.string()
      .required()
      .label("State"),
    city: Joi.string()
      .required()
      .label("State"),
    pincode: Joi.number()
      .required()
      .label("Pincode")
  };

  async componentDidMount() {
    const data = await getUserData();
    console.log({ data });
    this.setState({ isProfileEdit: true, data });
    this.renderStateList();
  }

  renderStateList = async () => {
    try {
      const { data: stateList } = await commonService.get("/common/state");
      this.setState({
        stateList: [{ name: "--Select State--", _id: "" }, ...stateList]
      });
    } catch (error) {
      console.log("Error while fetching stateList: ", error);
    }
  };

  renderCityList = async stateId => {
    try {
      const { data: cityList } = await commonService.get(
        `/common/cities/${stateId}`
      );
      console.log("renderCityList ", cityList, stateId);
      this.setState({
        cityList: [{ name: "--Select City--", _id: "" }, ...cityList]
      });
    } catch (error) {
      console.log("Error while fetching cityList: ", error);
    }
  };

  validateUniqueEmail = async email => {
    try {
      const { data: result } = await commonService.get(
        `/common/checkemail-availability/email/${email}`
      );
      console.log({ result });
      const errors = this.state.errors;
      if (result && result.response) {
        errors["email"] = "This email address already exists";
      }
      this.setState({ errors });
    } catch (error) {
      console.log("Email availability error: ", error);
    }
  };

  doSubmit = async () => {
    console.log("---- ", this.state.data);
    // const { password, cPassword } = this.state.data;
    // if (password !== cPassword) {
    //   const errors = { cPassword: "Password does not match." };
    //   this.setState({ errors });
    //   return;
    // }
    // try {
    //   const { data: response } = await commonService.post(
    //     "/auth/user/register",
    //     this.state.data
    //   );
    //   console.log(response);
    //   if (response && response.message) {
    //     return this.props.history.push("/?action=signUpsuccess&modal=open");
    //   }
    // } catch (error) {
    //   console.log("Error in registration: ", error);
    // }
  };

  render() {
    // const { data } = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <h3>Fill the following details to register as a new user-</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col-md-6">
                {this.renderInput(
                  "First Name",
                  "fname",
                  "input",
                  "Enter First Name"
                )}
              </div>
              <div className="col-md-6">
                {this.renderInput(
                  "Last Name",
                  "lName",
                  "input",
                  "Enter Last Name"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                {/* <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                  </div>
                </div> */}
                {this.renderInput(
                  "Email Address",
                  "email",
                  "email",
                  "Enter Email Address",
                  "validateUniqueEmail"
                )}
              </div>
              <div className="col-md-6">
                {this.renderInput(
                  "Phone Number",
                  "phoneNo",
                  "number",
                  "Enter Phone Number"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                {this.renderInput(
                  "Password",
                  "password",
                  "password",
                  "Enter Password"
                )}
              </div>
              <div className="col-md-6">
                {this.renderInput(
                  "Confirm Password",
                  "cPassword",
                  "password",
                  "Re-enter Password"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-4">
                {this.renderSelect(
                  "State",
                  "state",
                  this.state.stateList,
                  "renderCityList"
                )}
              </div>
              <div className="col-md-4">
                {this.renderSelect("City", "city", this.state.cityList)}
              </div>
              <div className="col-md-4">
                {this.renderInput(
                  "Pincode",
                  "pincode",
                  "number",
                  "Enter pincode"
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="col-md">
                <input
                  type="submit"
                  disabled={this.validate()}
                  className="btn btn-success btn-block"
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

export default ProfileEdit;
