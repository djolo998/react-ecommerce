import React from "react";

import { TextField } from "@material-ui/core";

const AuthInput = ({
  errors,
  formState,
  label,
  handleInputChange,
  name,
  type = name,
}) => {
  return (
    <>
      {" "}
      <TextField
        error={errors[name]}
        value={formState[name]}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type={type}
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        onChange={handleInputChange}
      />
      {errors[name] &&
        errors[name].map((e) => {
          return (
            <span
              style={{
                marginLeft: "14px",
                fontSize: "14px",
                color: "red",
              }}
            >
              {e}
            </span>
          );
        })}
    </>
  );
};
export default AuthInput;
