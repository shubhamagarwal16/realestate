import React from "react";
import Form from "./../common/form";
import Joi from "joi-browser";

class AddProperty extends Form {
  state = {
    data: {
      title: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Property Title")
  };

  renderPropertyTitle = data => {};

  render() {
    return (
      <React.Fragment>
        <div className="container mt-5 mb-5">
          <h4 className="text-danger">Add a New Property-</h4>
          <hr className="hr" />
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
          <div className="form-row">
            <div className="col-md-6">{/* {this.renderInput()} */}</div>
            <div className="col-md-6" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProperty;
