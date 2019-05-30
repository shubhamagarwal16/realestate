import React from "react";

const Input = ({ label, name, type, handleChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        onChange={handleChange}
        name={name}
        id={name}
        className="form-control"
      />
      <small className="text-danger">{error}</small>
    </div>
  );
};

export default Input;
