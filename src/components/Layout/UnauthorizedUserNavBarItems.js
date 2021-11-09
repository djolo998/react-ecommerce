import React from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

const UnauthorizedUserNavBarItems = () => {
  return (
    <>
      <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
        <Trans i18nKey={"auth.register.signUp"} />
      </Link>

      <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
        <Trans i18nKey={"auth.login.signIn"} />
      </Link>
    </>
  );
};

export default UnauthorizedUserNavBarItems;
