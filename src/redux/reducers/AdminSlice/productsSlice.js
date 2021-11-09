import { createSelector, createSlice } from "@reduxjs/toolkit";

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
  withNormalize,
  upsetNormalizedSlice,
} from "./util";

import {
  normalizeProducts,
  denormalizeProducts,
  normalizeProduct,
} from "../../../normalizr";

import { productsAdapter } from "./adapter";

//updateResource
const updateProductRejected = createUpdateResourceRejected("products");
const updateProductFulfilled = createUpdateResourceFulfilled("products");

//AddNewResource
const addNewProductRejected = createAddNewResourceRejected("products");
const addNewProductFulfilled = createAddNewResourceFulfilled("products");

const normalizeAndUpsetProduct = normalizeAndUpsetSlice(
  normalizeProduct,
  "products"
);
const upsetNormalizedProducts = upsetNormalizedSlice("products");
export const {
  fetchSingleResource: fetchProduct,
  deleteResource: deleteProduct,
  fetchMultypleResources: fetchProducts,
  addNewResource: addNewProduct,
  updateResource: updateProduct,
} = createCrudAsyncThunkFunctions({
  name: "product",
  url: "products",
  multypleResourceNormalized: normalizeProducts,
});

const productsToDelete = (entities, idToDelete, key) => {
  return Object.keys(entities).filter((k) => entities[k][key] == idToDelete);
};
const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [addNewProduct.fulfilled]: addNewProductFulfilled,
    [addNewProduct.rejected]: addNewProductRejected,
    [fetchProducts.fulfilled]: upsetNormalizedProducts,
    [fetchProduct.fulfilled]: normalizeAndUpsetProduct,
    [updateProduct.fulfilled]: updateProductFulfilled,
    [updateProduct.rejected]: updateProductRejected,
    [deleteProduct.fulfilled]: (state, action) => {
      let idToDelete = action.meta.arg;
      state.queryString = {};
      state.isLoading = false;

      productsAdapter.removeOne(state, idToDelete);
    },
    "admin/deleteBrand/fulfilled": (state, action) => {
      let idToDelete = action.meta.arg;
      let productsIdsToDelete = productsToDelete(
        state.entities,
        idToDelete,
        "brand_id"
      );
      state.queryString = {};
      productsAdapter.removeMany(state, productsIdsToDelete);
    },
    "admin/deleteColor/fulfilled": (state, action) => {
      let idToDelete = action.meta.arg;
      let productsIdsToDelete = productsToDelete(
        state.entities,
        idToDelete,
        "color_id"
      );
      state.queryString = {};
      productsAdapter.removeMany(state, productsIdsToDelete);
    },
  },
});

export const { selectById: selectProductById } = productsAdapter.getSelectors(
  (state) => state.admin.products
);

const selectAdminProducts = (state) => state.admin.products;

//products
export const selectProductsErrors = createSelector(
  selectAdminProducts,
  selectCreateErrors
);
export const selectProductsUpdateErrors = createSelector(
  selectAdminProducts,
  selectUpdateErrors
);

export const selectProducts = createResourceSelector(
  "products",
  ["brands", "colors", "genres", "categories", "sizes", "products"],
  // ["brands", "products"],
  denormalizeProducts
);
export default productsSlice.reducer;
