import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";
import Select from "./select";
import RadioButtons from "./radioButtons";

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
    let attrType = "value";
    if (currentTarget.type === "checkbox") attrType = "checked";
    data[currentTarget.name] = currentTarget[attrType];
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    this.setState({ data, errors }, () => {
      if (optionalFnCall) this[optionalFnCall](currentTarget.value);
    });
  };

  renderInput(
    label,
    name,
    type = "",
    placeholder = "",
    optionalFnCall = "",
    value
  ) {
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
        value={value}
      />
    );
  }
  renderSelect(
    label,
    name,
    options,
    optionalFnCall = "",
    valueProperty,
    textProperty,
    isLoading
  ) {
    return (
      <Select
        label={label}
        handleChange={this.handleChange}
        name={name}
        options={options}
        valueProperty={valueProperty}
        textProperty={textProperty}
        error={this.state.errors[name]}
        optionalFnCall={optionalFnCall}
        isLoading={isLoading}
      />
    );
  }
  renderRadioButton(buttons, label, optionalFnCall) {
    return (
      <RadioButtons
        buttons={buttons}
        onChange={this.handleChange}
        label={label}
        optionalFnCall={optionalFnCall}
      />
    );
  }
}

export default Form;
