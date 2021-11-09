import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { spacing } from "@material-ui/system";
import styled from "styled-components";

import {
  CssBaseline,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import Pagination from "../../../components/Pagination";

import {
  fetchOrders,
  selectOrders,
} from "../../../redux/reducers/AdminSlice/ordersSlice";

import { getQueryString, formatPrice } from "../../../utils";

import queryString from "query-string";

import { createTable } from "../util";

import AdminHeader from "../components/AdminHeader";

const Divider = styled(MuiDivider)(spacing);

const orderTableDate = [
  { title: "Order Id", key: "id" },
  { title: "Subtotal", key: "subtotal", custom: true, fn: formatPrice },
  { title: "Status", key: "status.order_status_name" },
  { title: "User", key: "user.first_name" },
];

const ListOrderPage = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.admin.isLoading);

  const querySearch = getQueryString(props.history.location.search);

  const ordersLoadedInStore = useSelector(
    (state) => state.admin.orders.queryString[querySearch]
  );

  const { data, ...statePaginationProps } = useSelector((state) =>
    selectOrders(state, querySearch)
  );

  const handleChangePage = (e, page) => {
    let query = queryString.stringify(
      {
        page: page,
      },
      { arrayFormat: "bracket" }
    );
    props.history.push(`${props.history.location.pathname}?${query}`);
  };
  const paginationProps = {
    ...statePaginationProps,
    handleChangePage,
  };

  useEffect(() => {
    if (!ordersLoadedInStore) {
      dispatch(fetchOrders(getQueryString(querySearch)));
    }
  }, [props.history.location.search, ordersLoadedInStore]);

  let content = createTable(orderTableDate, data, isLoading);
  return (
    <>
      <Helmet title="Admin Orders Page" />
      <AdminHeader
        newResourceLink="/admin/orders/create"
        welcomeText="Orders"
        newResourceEnabled={false}
      />

      <Divider my={3} />

      <Grid justify="space-between" container spacing={6}>
        {content}

        <Pagination {...paginationProps} />
      </Grid>
    </>
  );
};

export default ListOrderPage;
