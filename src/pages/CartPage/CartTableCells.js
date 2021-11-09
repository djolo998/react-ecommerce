import React from "react";
import { TableCell } from "@material-ui/core";
import { Trans } from "react-i18next";

const CartTableCells = () => {
  const tableCells = ["product", "price", "size", "quantity", ""];

  return tableCells.map((x, ind) => {
    let props = ind == 0 ? {} : { align: "right" };
    let i18nKey = `cart.tableCells.${x}`;
    return (
      <TableCell key={`table-cells-${x}`} {...props}>
        <Trans i18nKey={i18nKey} />
      </TableCell>
    );
  });
};

export default CartTableCells;
