import React, { useEffect } from "react";
import {
  CssBaseline,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  AppBar as MuiAppBar,
  Toolbar,
  Hidden,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from "@material-ui/core";
import { fetchOrders } from "../../redux/reducers/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import RenderOrders from "./RenderOrders";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const AccountPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.items);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper style={{ height: "180px" }}>
                <Box>
                  <List>
                    <ListItemLink href="#orders" selected={true}>
                      <ListItemText primary="Orders" />
                    </ListItemLink>
                  </List>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper style={{ height: "100%" }}>
                {orders && <RenderOrders orders={orders} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default AccountPage;
