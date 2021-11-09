import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";

import StyledLink from "../../../components/StyledLink";

const EditIconButton = ({ editLink }) => {
  return (
    <StyledLink to={editLink} variant="body2">
      <VisibilityIcon style={{ cursor: "pointer", color: "black" }} />
    </StyledLink>
  );
};

export default EditIconButton;
