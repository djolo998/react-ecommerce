import React, { useEffect } from "react";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@material-ui/core";
import CartTableImage from "../CartPage/CartTableImage";
import CartTableCells from "../CartPage/CartTableCells";
import OrderTableCell from "./OrderTableCell";

const RenderOrders = ({ orders }) => {
  return (
    <>
      {orders.map((o) => {
        return (
          <div key={o.id}>
            <Box
              style={{
                padding: "10px",
              }}
            >
              <Typography>Order ID: {o.id}</Typography>
              <Typography>Order Date: {o.order_date}</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <CartTableCells />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {o.details.map((d) => {
                    return (
                      <TableRow key={d.op_id}>
                        <TableCell component="th" scope="row" align="right">
                          <Box display="flex" alignItems="center">
                            <Box>
                              <CartTableImage imageUrl={d.product.image} />
                            </Box>
                            <Typography>{d.product.product_name}</Typography>
                          </Box>
                        </TableCell>
                        <OrderTableCell value={d.product_price_paid} />
                        <OrderTableCell value={d.size.size_value} />
                        <OrderTableCell value={d.quantity} />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })}
    </>
  );
};

export default RenderOrders;
