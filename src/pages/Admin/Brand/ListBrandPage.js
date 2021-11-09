import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Pagination from "../../../components/Pagination";

import {
  fetchBrands,
  deleteBrand,
  selectBrands,
} from "../../../redux/reducers/AdminSlice/brandsSlice";
import { createTable } from "../util";
import useAdminPagination from "../../../hooks/useAdminPagination";
import useQueryString from "../../../hooks/useQueryString";
import { AdminHeader, Divider } from "../components";
import { brandTableDate } from "./shared";

const ListBrandPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { handleChangePage } = useAdminPagination();
  const { querySearch } = useQueryString();

  const isLoading = useSelector((state) => state.admin.isLoading);

  const brandsLoadedInStore = useSelector(
    (state) => state.admin.brands.queryString[querySearch]
  );

  const { data, ...statePaginationProps } = useSelector((state) =>
    selectBrands(state, querySearch)
  );

  const paginationProps = {
    ...statePaginationProps,
    handleChangePage,
  };

  useEffect(() => {
    if (!brandsLoadedInStore) {
      dispatch(fetchBrands(querySearch));
    }
  }, [search, brandsLoadedInStore]);

  let content = createTable(brandTableDate, data, isLoading);
  return (
    <>
      <AdminHeader
        newResourceLink="/admin/brands/create"
        welcomeText="Brands"
        newResourceBtnText="New Brand"
        title="Admin - Brands"
      />

      <Divider />

      <Grid justify="space-between" container spacing={6}>
        {content}

        <Pagination {...paginationProps} />
      </Grid>
    </>
  );
};

export default ListBrandPage;
