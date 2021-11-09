import React from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useCheckout } from "../../hooks";
import { Trans } from "react-i18next";

const CartPageOverview = () => {
  const {
    checkoutState,
    setCheckoutState,
    handleDeliveryChange,
    handleSelectedPaymentMethodChange,
    checkout,
    handleOrder,
  } = useCheckout();

  return (
    <Paper style={{ height: "100%" }}>
      <Box
        display="flex"
        flexDirection="column"
        style={{ height: "100%", padding: "20px" }}
      >
        <Typography style={{ fontWeight: "bold", fontSize: "24px" }}>
          <Trans i18nKey={"cart.overview"} />
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography style={{ fontSize: "18px" }}>
            <Trans i18nKey="cart.deliveryMethod" />
          </Typography>
          <Box style={{ marginLeft: "auto" }}>
            <Select
              value={checkoutState.delivery}
              onChange={handleDeliveryChange}
            >
              {checkout.deliveryOptions.map((x) => {
                return (
                  <MenuItem value={x.id} key={x.id}>
                    <Trans i18nKey={x.i18Key} />
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography style={{ fontSize: "18px" }}>
            <Trans i18nKey={"cart.paymentMethod"} />
          </Typography>
          <Box style={{ marginLeft: "auto" }}>
            <Select
              value={checkoutState.paymentMethod}
              onChange={handleSelectedPaymentMethodChange}
            >
              {checkout.paymentOptions.map((x) => {
                return (
                  <MenuItem value={x.id} key={x.id}>
                    <Trans i18nKey={x.i18Key} />
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography style={{ fontSize: "18px" }}>
            <Trans i18nKey={"cart.estimatedShipping"} />
          </Typography>
          <Typography style={{ fontSize: "18px", marginLeft: "auto" }}>
            {checkout.totalShippingCost}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography style={{ fontSize: "18px" }}>
            <Trans i18nKey={"cart.total"} />
          </Typography>
          <Typography style={{ fontSize: "18px", marginLeft: "auto" }}>
            {checkout.totalCost}
          </Typography>
        </Box>
        <Box style={{ marginTop: "auto" }}>
          <Button onClick={handleOrder}>
            <Trans i18nKey={"cart.order"} />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CartPageOverview;
