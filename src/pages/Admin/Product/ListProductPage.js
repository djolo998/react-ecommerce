import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Grid } from "@material-ui/core";

import Pagination from "../../../components/Pagination";

import {
  fetchProducts,
  selectProducts,
  deleteProduct,
} from "../../../redux/reducers/AdminSlice/productsSlice";

import { createTable } from "../util";

import AdminHeader from "../components/AdminHeader";

import useAdminPagination from "../../../hooks/useAdminPagination";
import useQueryString from "../../../hooks/useQueryString";

import { Divider } from "../components";
import { productTableDate } from "./shared";

const ListProductPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { handleChangePage } = useAdminPagination();
  const { querySearch } = useQueryString();

  const isLoading = useSelector((state) => state.admin.isLoading);
  const productsLoadedInStore = useSelector(
    (state) => state.admin.products.queryString[querySearch]
  );

  const { data, ...statePaginationProps } = useSelector((state) =>
    selectProducts(state, querySearch)
  );

  const paginationProps = {
    ...statePaginationProps,
    handleChangePage,
  };

  useEffect(() => {
    if (!productsLoadedInStore) {
      dispatch(fetchProducts(querySearch));
    }
  }, [search, productsLoadedInStore]);

  let content = createTable(productTableDate, data, isLoading);
  return (
    <>
      <AdminHeader
        newResourceLink="/admin/products/create"
        welcomeText="Products"
        newResourceBtnText="New Product"
        title="Admin - Products"
      />
      <Divider />
      <Grid justify="space-between" container spacing={6}>
        {content}
        <Pagination {...paginationProps} />
      </Grid>
    </>
  );
};

export default ListProductPage;
