import React from "react";
import { Button } from "@material-ui/core";
import { Trans } from "react-i18next";

const CartUpdateBtn = ({ onClick, product_id }) => {
  return (
    <Button
      onClick={(e) => onClick(product_id)}
      size="small"
      variant="outlined"
      style={{
        marginRight: "20px",
        padding: "8px",
      }}
    >
      <Trans i18nKey={"cart.btns.update"} />
    </Button>
  );
};

export default CartUpdateBtn;
