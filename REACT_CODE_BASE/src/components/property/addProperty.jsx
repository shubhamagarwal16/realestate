import React from "react";
import Joi from "joi-browser";

import * as commonService from "../../services/commonServices";
import Form from "./../common/form";

class AddProperty extends Form {
  state = {
    data: {
      title: "",
      propertyFor: "",
      Proptype: "",
      price: 0,
      length: 0,
      breadth: 0,
      cornrPlot: false,
      state: "",
      city: "",
      pincode: "",
      locality: "",
      isSociety: false,
      societyName: "",
      flatNo: "",
      description: "",
      address: "",
      email: "",
      phoneNo: 0
    },
    errors: {},
    propertyTypeList: [],
    stateList: [],
    cityList: [],
    isCityListLoading: false
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Property Title"),
    propertyFor: Joi.string()
      .required()
      .label("Property For"),
    Proptype: Joi.string()
      .required()
      .label("Property Type"),
    price: Joi.number().label("Price"),
    length: Joi.number()
      .required()
      .label("Length"),
    breadth: Joi.number()
      .required()
      .label("Breadth"),
    cornrPlot: Joi.boolean().label("Corner Plot"),
    state: Joi.string()
      .required()
      .label("State"),
    city: Joi.string()
      .required()
      .label("City"),
    pincode: Joi.string()
      .required()
      .label("Pincode"),
    locality: Joi.string()
      .required()
      .label("Locality"),
    isSociety: Joi.boolean()
      .required()
      .label("Society option"),
    societyName: Joi.string().label("Society Name"),
    flatNo: Joi.string().label("Flat Number"),
    description: Joi.string()
      .required()
      .label("Description"),
    address: Joi.string()
      .required()
      .label("Address"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    phoneNo: Joi.number()
      .required()
      .label("Phone Number")
  };

  async componentDidMount() {
    let { data: propertyTypeList } = await commonService.get("/property/type");
    console.log({ propertyTypeList });
    propertyTypeList = [
      { _id: "", title: "Select Property Type" },
      ...propertyTypeList
    ];

    const stateList = await commonService.renderStateList();

    this.setState({ propertyTypeList, stateList });
  }

  renderPropertyTitle = txt => {
    const data = { ...this.state.data };
    data.title = "";
    data.title = data.cornrPlot ? "Corner Plot at " : "";
    data.title += data.locality ? " " + data.locality : "";
    data.title += data.city ? ", " + data.city : "";
    data.title += data.state ? ", " + data.state : "";

    console.log("renderPropertyTitle", data.title);
    this.setState({ data });
  };

  calculateArea = data => {};

  renderCityList = async stateId => {
    this.setState({ isCityListLoading: true });
    const cityList = await commonService.renderCityList(stateId);
    this.setState({ cityList, isCityListLoading: false });
    this.renderPropertyTitle("");
  };

  render() {
    const {
      propertyTypeList,
      stateList,
      cityList,
      isCityListLoading,
      data
    } = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <h4 className="text-danger text-center">Add a New Property-</h4>
          <hr className="hr" />
          <div className="form-row">
            <div className="col-md-3">
              {this.renderRadioButton(
                [
                  {
                    name: "propertyFor",
                    value: "sell",
                    title: "Sell"
                  },
                  {
                    name: "propertyFor",
                    value: "rent",
                    title: "Rent"
                  }
                ],
                "Property For"
              )}
            </div>
            <div className="col-md-4">
              {this.renderSelect(
                "Property Type:",
                "Proptype",
                propertyTypeList,
                "",
                "_id",
                "title"
              )}
            </div>
            <div className="col-md-1" />
            <div className="col-md-4">
              {this.renderInput(
                "Enter Total Amount (optional)",
                "price",
                "number",
                "Enter total amount"
              )}
            </div>
          </div>
          <h4>Additional Data -</h4>
          <hr className="hr" />
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="">Plot Dimensions -</label>
              <div className="form-row">
                <div className="col-md-4">
                  {this.renderInput(
                    "Length",
                    "length",
                    "number",
                    "Plot length",
                    "calculateArea"
                  )}
                </div>
                <div className="col-md-4">
                  {this.renderInput(
                    "Breadth",
                    "breadth",
                    "number",
                    "Plot breadth",
                    "calculateArea"
                  )}
                </div>
                <div className="col-md-4">
                  <p>Total-</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {" "}
              <br />
              <label htmlFor="cornrPlot">Corner Plot?</label>
              <input
                type="checkbox"
                onChange={event => this.handleChange(event)}
                name="cornrPlot"
                value="true"
                id="cornrPlot"
              />
            </div>
          </div>
          <h4>Location -</h4>
          <hr className="hr" />
          <div className="form-row">
            <div className="col-md-3">
              {this.renderSelect(
                "State:",
                "state",
                stateList,
                "renderCityList"
              )}
            </div>
            <div className="col-md-3">
              {this.renderSelect(
                "City:",
                "city",
                cityList,
                "renderPropertyTitle",
                "_id",
                "name",
                isCityListLoading
              )}
            </div>
            <div className="col-md-3">
              {this.renderInput(
                "Pincode",
                "pincode",
                "number",
                "Enter Pincode"
              )}
            </div>
            <div className="col-md-3">
              {this.renderInput(
                "Locality:",
                "locality",
                "input",
                "Enter Locality"
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-3">
              {this.renderRadioButton(
                [
                  {
                    name: "isSociety",
                    value: true,
                    title: "Yes"
                  },
                  {
                    name: "isSociety",
                    value: false,
                    title: "No"
                  }
                ],
                "Is it a Society?"
              )}
            </div>
            <div className="col-md-4">
              {this.state.data.isSociety == "true" &&
                this.renderInput(
                  "Society Name:",
                  "societyName",
                  "",
                  "Enter Society Name"
                )}
            </div>
            <div className="col-md-1" />
            <div className="col-md-4">
              {this.state.data.isSociety == "true" &&
                this.renderInput(
                  "Flat No.:",
                  "flatNo",
                  "",
                  "Enter Flat Number"
                )}
            </div>
          </div>
          <h4>Other Information -</h4>
          <hr className="hr" />
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            maxLength="500"
            rows="5"
            className="form-control"
          />
          <div className="form-row">
            <div className="col-md-12">
              {this.renderInput(
                "Property Complete Address:",
                "address",
                "",
                "Enter complete Property's Address"
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6">
              {this.renderInput("Email:", "email", "email", "Enter email")}
            </div>
            <div className="col-md-6">
              {this.renderInput(
                "Phone Number:",
                "phoneNo",
                "number",
                "Enter phone number"
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-12">
              {this.renderInput(
                "Add Property Title",
                "title",
                "input",
                "Add property title",
                "renderPropertyTitle",
                data.title
              )}
            </div>
          </div>
          <div className="form-row">
            <button className="btn btn-primary btn-block">
              Add New Property
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProperty;
