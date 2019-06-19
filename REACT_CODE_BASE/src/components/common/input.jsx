import React from "react";

const Input = ({
  label,
  name,
  type,
  handleChange,
  error,
  placeholder,
  optionalFnCall
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        onChange={event => handleChange(event, optionalFnCall)}
        name={name}
        placeholder={placeholder}
        id={name}
        className="form-control"
      />
      <small className="text-danger">{error}</small>
    </div>
  );
};

export default Input;
