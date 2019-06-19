import React from "react";

const Select = ({
  name,
  handleChange,
  label,
  options,
  valueProperty,
  textProperty,
  error,
  optionalFnCall
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        onChange={event => handleChange(event, optionalFnCall)}
        id={name}
        className="form-control"
      >
        {options.map(option => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      <small className="text-danger">{error}</small>
    </div>
  );
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
