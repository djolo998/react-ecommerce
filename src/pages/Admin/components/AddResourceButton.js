import React from "react";
import { Button } from "@material-ui/core";

const AddResourceButton = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={{ marginTop: "20px", width: "100%" }}
    >
      {text}
    </Button>
  );
};

export default AddResourceButton;
