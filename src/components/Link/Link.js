import React from "react";
import { Link as RRLink } from "react-router-dom";

const Link = ({ props }) => {
  return (
    <RRLink {...props} style={{ textDecoration: "none", color: "white" }} />
  );
};

export default Link;
