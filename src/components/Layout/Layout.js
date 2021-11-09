import React from "react";
import { AppBar, Box } from "@material-ui/core";

import ChangeThemeBtn from "../ChangeThemeBtn";
import ShoppingCartBtn from "../ShoppingCartBtn";
import HomeBtn from "../HomeBtn";
import { UserMenu, UserMenuTooltip } from "../UserMenu";
import UnauthorizedUserNavBarItems from "./UnauthorizedUserNavBarItems";

const Layout = ({ children, isLoggedIn, isAdmin }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          style={{ minHeight: "50px", gap: "15px", padding: "10px" }}
        >
          <HomeBtn />

          {!isLoggedIn && <UnauthorizedUserNavBarItems />}
          <ChangeThemeBtn />

          {isLoggedIn && (
            <>
              <ShoppingCartBtn /> <UserMenuTooltip handleClick={handleClick} />
            </>
          )}
        </Box>

        <UserMenu
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          isAdmin={isAdmin}
        />
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
