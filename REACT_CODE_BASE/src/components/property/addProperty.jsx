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
      cornrPlot: false
    },
    errors: {},
    propertyTypeList: [],
    stateList: [],
    cityList: []
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
    cornrPlot: Joi.boolean().label("Corner Plot")
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

  renderPropertyTitle = data => {};
  calculateArea = data => {};
  renderCityList = async data => {};

  render() {
    const { propertyTypeList, stateList } = this.state;
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
          <div className="form-row">
            <div className="col-md-12">
              {this.renderInput(
                "Add Property Title",
                "title",
                "input",
                "Add property title",
                "renderPropertyTitle"
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
            <div className="col-md-3" />
            <div className="col-md-3" />
            <div className="col-md-3" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProperty;
