import React, { useEffect } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Divider,
  Typograph as MuiTypography,
  Toolbar,
  Hidden,
  Link,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useCart, useCheckout } from "../../hooks";
import CartTableCells from "./CartTableCells";
import CartTableImage from "../../components/CartTableImage";
import { formatValue } from "../../utils";
import CartPageOverview from "./CartPageOverview";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const {
    cartState,
    setCartState,
    handleSelectedSizeChange,
    handleSelectedQuantityChange,
    handleDeleteCartItem,
  } = useCart();

  const {
    checkoutState,
    setCheckoutState,
    handleDeliveryChange,
    handleSelectedPaymentMethodChange,
  } = useCheckout();

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Paper>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <CartTableCells />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart &&
                      cartState &&
                      cart.map((item, index) => {
                        let productId = item.product.product_id;
                        let cartId = item.cart_id;
                        let currentItem = cartState[cartId];
                        return (
                          <TableRow key={item.cart_id}>
                            <TableCell component="th" scope="row">
                              <Box display="flex" alignItems="center">
                                <CartTableImage imageUrl={item.product.image} />
                                <Box>{item.product.product_name}</Box>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="p"
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                }}
                              >
                                {formatValue(
                                  item.product.product_price *
                                    currentItem.selectedQuantity
                                )}
                              </Typography>
                              <Typography style={{ fontSize: "10px" }}>
                                {currentItem.productPriceString} each
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <FormControl>
                                <Select
                                  value={cartState[cartId].selectedSizeId}
                                  onChange={(e) =>
                                    handleSelectedSizeChange(
                                      cartId,
                                      e.target.value
                                    )
                                  }
                                >
                                  {item.product.sizes.map((size) => {
                                    return (
                                      <MenuItem value={size.size_id}>
                                        {size.size_value}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell align="right">
                              <FormControl>
                                <Select
                                  value={cartState[cartId].selectedQuantity}
                                  onChange={(e) =>
                                    handleSelectedQuantityChange(
                                      cartId,
                                      e.target.value
                                    )
                                  }
                                >
                                  {Array.from(
                                    {
                                      length:
                                        cartState[cartId].sizes[
                                          cartState[cartId].selectedSizeId
                                        ].pivot.quantity,
                                    },
                                    (_, i) => i + 1
                                  ).map((val) => {
                                    return (
                                      <MenuItem value={val}>{val}</MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <Box display="flex">
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={(e) =>
                                    handleDeleteCartItem(item.cart_id)
                                  }
                                >
                                  X
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CartPageOverview />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
