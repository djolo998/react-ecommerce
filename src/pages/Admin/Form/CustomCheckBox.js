import React from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@material-ui/core";

import { DisplayFieldErrors } from "../Form";

const CustomCheckBox = ({
  input,
  formInputs,
  formState,
  formErrorState,
  handleChange,
  arrayData,
}) => {
  return (
    <div>
      <div>
        <FormControl component="fieldset">
          <FormGroup>
            <Paper style={{ padding: "20px" }}>
              <FormLabel component="legend">{input.label}</FormLabel>
              <Grid container style={{ flexGrow: 1 }}>
                {arrayData &&
                  arrayData.map((el) => {
                    return (
                      <Grid item sm={12} md={4} lg={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={el[input.value]}
                              checked={formState[input.name].includes(
                                el[input.value]
                              )}
                              onChange={handleChange}
                              name={input.name}
                            />
                          }
                          label={el[input.elementValueKey]}
                        />
                      </Grid>
                    );
                  })}{" "}
              </Grid>
            </Paper>
          </FormGroup>
        </FormControl>
      </div>
      <div>
        {formErrorState && (
          <DisplayFieldErrors field={formErrorState[input.name]} />
        )}
      </div>
    </div>
  );
};

export default CustomCheckBox;
