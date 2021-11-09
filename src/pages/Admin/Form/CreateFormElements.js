import React from "react";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Input,
  TextField,
} from "@material-ui/core";

import DisplayFieldErrors from "./DisplayFieldErrors";
import CustomSelect from "./CustomSelect";
import CustomCheckBox from "./CustomCheckBox";

const TextInput = (props) => {
  return <TextField fullWidth {...props} style={{}} />;
};
const NumberInput = (props) => {
  return <Input fullWidth {...props} style={{}} placeholder={props.label} />;
};

const CreateFormElements = ({
  formInputs,
  formState,
  formErrorState,
  handleFieldChange,
}) => {
  let componentKeyMap = {
    text: TextInput,
    number: NumberInput,
    select: CustomSelect,
  };
  return formInputs.map((input) => {
    let Component = componentKeyMap[input.type];
    return (
      <div style={{ marginBottom: "20px" }}>
        <Component
          type={input.type}
          name={input.name}
          label={input.label}
          value={formState[input.name]}
          onChange={handleFieldChange}
          error={formErrorState && formErrorState[input.name]}
          formState={formState}
          formErrorState
          arrayData={input.arrayData}
          elementValueKey={input.elementValueKey}
        />
        <div>
          {formErrorState && (
            <DisplayFieldErrors field={formErrorState[input.name]} />
          )}
        </div>
      </div>
    );
  });
};

export default CreateFormElements;
