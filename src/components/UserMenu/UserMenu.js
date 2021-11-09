import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";
import { Link } from "react-router-dom";
import SelectLanguage from "../SelectLanguage";

const UserMenu = ({ open, handleClose, anchorEl, isAdmin }) => {
  const dispatch = useDispatch();

  const handleLogOutClicked = () => {
    dispatch(logout());
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuItem component={Link} to="/me/">
        My Account
      </MenuItem>
      {isAdmin && (
        <MenuItem component={Link} to="/admin/">
          Admin
        </MenuItem>
      )}

      <MenuItem onClick={handleLogOutClicked}>Logout</MenuItem>
      <MenuItem>
        <SelectLanguage />
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
