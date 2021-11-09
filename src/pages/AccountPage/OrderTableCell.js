import React from "react";
import { Typography, TableCell } from "@material-ui/core";

const OrderTableCell = ({ value }) => {
  return (
    <TableCell align="right">
      <Typography style={{ fontSize: "14px" }}>{value}</Typography>
    </TableCell>
  );
};

export default OrderTableCell;
