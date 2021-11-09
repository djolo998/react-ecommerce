import React from "react";
import { Select, Typography, FormControl } from "@material-ui/core";

import { DisplayFieldErrors } from "../Form";

const CustomSelect = ({
  formState,
  formErrorState,
  onChange,
  name,
  type,
  label,
  elementValueKey,
  arrayData,
}) => {
  return (
    <FormControl>
      <Typography>{label}</Typography>
      <Select
        native
        name={name}
        value={formState[name]}
        onChange={onChange}
        label={label}
        style={{ width: "100%" }}
      >
        {arrayData &&
          arrayData.map((el, ind) => {
            return (
              <>
                {ind == 0 ? <option value={0}>Select... </option> : null}
                <option value={el[name]}>{el[elementValueKey]}</option>
              </>
            );
          })}
      </Select>
      <div>
        {formErrorState && <DisplayFieldErrors field={formErrorState[name]} />}
      </div>
    </FormControl>
  );
};

export default CustomSelect;
