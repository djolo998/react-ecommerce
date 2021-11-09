import React from "react";
import { IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { Brightness4, Brightness7 } from "@material-ui/icons";
import { changeTheme, getTheme } from "../../redux/reducers/uiSlice";
const ChangeThemeBtn = () => {
  const dispatch = useDispatch();

  const currentTheme = useSelector(getTheme);

  const nextTheme = currentTheme == "dark" ? "light" : "dark";

  let Icon = currentTheme == "dark" ? Brightness7 : Brightness4;

  const handleThemeChanged = () => {
    dispatch(changeTheme(nextTheme));
  };

  return (
    <IconButton color="inherit" onClick={handleThemeChanged}>
      <Icon />
    </IconButton>
  );
};

export default ChangeThemeBtn;
