import {
  createSelector,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "../../../axios";

import {
  createResourceSelector,
  normalizeAndUpsetSlice,
  createUpdateResourceRejected,
  createUpdateResourceFulfilled,
  createAddNewResourceRejected,
  createAddNewResourceFulfilled,
  createCrudAsyncThunkFunctions,
  selectCreateErrors,
  selectUpdateErrors,
  upsetNormalizedSlice,
} from "./util";

import {
  normalizeBrands,
  denormalizeBrands,
  normalizeBrand,
} from "../../../normalizr";

import { brandsAdapter } from "./adapter";

import { fetchProducts } from "./productsSlice";

//Update Resource
const updateBrandRejected = createUpdateResourceRejected("brands");
const updateBrandFulfilled = createUpdateResourceFulfilled("brands");

//AddNewResource
const addNewBrandRejected = createAddNewResourceRejected("brands");
const addNewBrandFulfilled = createAddNewResourceFulfilled("brands");

const normalizeAndUpsetBrandSlice = normalizeAndUpsetSlice(
  normalizeBrands,
  "brands"
);
const normalizeAndUpsetBrand = normalizeAndUpsetSlice(normalizeBrand, "brands");

const upsetBrandsFromProducts = upsetNormalizedSlice("brands");

export const {
  fetchSingleResource: fetchBrand,
  deleteResource: deleteBrand,
  fetchMultypleResources: fetchBrands,
  addNewResource: addNewBrand,
  updateResource: updateBrand,
} = createCrudAsyncThunkFunctions({
  name: "brand",
  url: "brands",
});

const brandsSlice = createSlice({
  name: "brands",
  initialState: brandsAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [addNewBrand.fulfilled]: addNewBrandFulfilled,
    [addNewBrand.rejected]: addNewBrandRejected,
    // [fetchBrands.pending]: startLoading,
    [fetchBrands.fulfilled]: normalizeAndUpsetBrandSlice,
    [fetchBrand.fulfilled]: normalizeAndUpsetBrand,
    [updateBrand.fulfilled]: updateBrandFulfilled,
    [updateBrand.rejected]: updateBrandRejected,
    [deleteBrand.fulfilled]: (state, action) => {
      let idToDelete = action.meta.arg;
      state.queryString = {};
      brandsAdapter.removeOne(state, idToDelete);
    },

    [fetchProducts.fulfilled]: upsetBrandsFromProducts,
  },
});

export const { selectAll: selectBrandsAll, selectById: selectBrandById } =
  brandsAdapter.getSelectors((state) => state.admin.brands);

const selectAdminBrands = (state) => state.admin.brands;

export const selectBrandCreateErrors = createSelector(
  selectAdminBrands,
  selectCreateErrors
);
export const selectBrandUpdateErrors = createSelector(
  selectAdminBrands,
  selectUpdateErrors
);

export const selectBrands = createResourceSelector(
  "brands",
  ["brands"],
  denormalizeBrands
);

export default brandsSlice.reducer;
