import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Pagination from "../../../components/Pagination";
import {
  fetchCategories,
  selectCategories,
} from "../../../redux/reducers/AdminSlice/categoriesSlice";

import { getQueryString } from "../../../utils";
import { createTable } from "../util";
import useAdminPagination from "../../../hooks/useAdminPagination";
import useQueryString from "../../../hooks/useQueryString";
import { AdminHeader, Divider } from "../components";
import { categoryTableDate } from "./shared";

const ListCategoryPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { handleChangePage } = useAdminPagination();
  const { querySearch } = useQueryString();

  const isLoading = useSelector((state) => state.admin.isLoading);

  const categoriesLoadedInStore = useSelector(
    (state) => state.admin.categories.queryString[querySearch]
  );

  const { data, ...statePaginationProps } = useSelector((state) =>
    selectCategories(state, querySearch)
  );

  const paginationProps = {
    ...statePaginationProps,
    handleChangePage,
  };

  useEffect(() => {
    if (!categoriesLoadedInStore) {
      dispatch(fetchCategories(getQueryString(querySearch)));
    }
  }, [search, categoriesLoadedInStore]);

  let content = createTable(categoryTableDate, data, isLoading);
  return (
    <>
      <AdminHeader
        newResourceLink="/admin/categories/create"
        welcomeText="Categories"
        newResourceBtnText="New Category"
        title="Admin - Categories"
      />

      <Divider />

      <Grid justify="space-between" container spacing={6}>
        {content}

        <Pagination {...paginationProps} />
      </Grid>
    </>
  );
};

export default ListCategoryPage;
