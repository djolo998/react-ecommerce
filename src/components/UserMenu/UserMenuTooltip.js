import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const UserMenuTooltip = ({ handleClick }) => {
  return (
    <Tooltip title="Settings">
      <IconButton onClick={handleClick} size="small">
        <AccountCircleOutlinedIcon style={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

export default UserMenuTooltip;
