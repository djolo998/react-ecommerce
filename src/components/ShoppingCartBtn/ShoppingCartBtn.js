import React from "react";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShoppingCartBtn = () => {
  const items = useSelector((state) => state.cart.items);
  const cartItemsCount = items.length;
  return (
    <IconButton
      aria-label="go to cart"
      color="inherit"
      component={Link}
      to="/cart"
    >
      <Badge badgeContent={cartItemsCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default ShoppingCartBtn;
