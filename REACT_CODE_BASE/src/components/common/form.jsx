import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(this.state.errors);
    if (errors) return;
    this.doSubmit();
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    // console.log({ error });
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget }, optionalFnCall) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[currentTarget.name] = currentTarget.value;
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    this.setState({ data, errors });
    if (optionalFnCall) this[optionalFnCall](currentTarget.value);
  };

  asda() {
    console.log("=======================");
  }

  renderInput(label, name, type = "", placeholder = "", optionalFnCall = "") {
    if (!type) type = "input";
    return (
      <Input
        label={label}
        handleChange={this.handleChange}
        name={name}
        type={type}
        placeholder={placeholder}
        error={this.state.errors[name]}
        optionalFnCall={optionalFnCall}
      />
    );
  }
  renderSelect(label, name, options, optionalFnCall = "") {
    return (
      <Select
        label={label}
        handleChange={this.handleChange}
        name={name}
        options={options}
        error={this.state.errors[name]}
        optionalFnCall={optionalFnCall}
      />
    );
  }
}

export default Form;
