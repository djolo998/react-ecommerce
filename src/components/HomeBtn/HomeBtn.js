import React from "react";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";

const HomeBtn = () => {
  return (
    <IconButton
      color="inherit"
      component={Link}
      to="/"
      style={{ marginRight: "auto" }}
    >
      <HomeIcon />
    </IconButton>
  );
};

export default HomeBtn;
