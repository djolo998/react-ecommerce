import {
  createSelector,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

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
  normalizeColors,
  denormalizeColors,
  normalizeColor,
} from "../../../normalizr";

import { colorsAdapter } from "./adapter";

import { fetchProducts } from "./productsSlice";

//updateResource
const updateColorRejected = createUpdateResourceRejected("colors");
const updateColorFulfilled = createUpdateResourceFulfilled("colors");

//AddNewResource
const addNewColorRejected = createAddNewResourceRejected("colors");
const addNewColorFulfilled = createAddNewResourceFulfilled("colors");

const normalizeAndUpsetColorSlice = normalizeAndUpsetSlice(
  normalizeColors,
  "colors"
);
const normalizeAndUpsetColor = normalizeAndUpsetSlice(normalizeColor, "colors");

const upsetColorsFromProducts = upsetNormalizedSlice("colors");

export const {
  fetchSingleResource: fetchColor,
  deleteResource: deleteColor,
  fetchMultypleResources: fetchColors,
  addNewResource: addNewColor,
  updateResource: updateColor,
} = createCrudAsyncThunkFunctions({
  name: "color",
  url: "colors",
});

const colorsSlice = createSlice({
  name: "colors",
  initialState: colorsAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [addNewColor.fulfilled]: addNewColorFulfilled,
    [addNewColor.rejected]: addNewColorRejected,
    [fetchColors.fulfilled]: normalizeAndUpsetColorSlice,
    [fetchColor.fulfilled]: normalizeAndUpsetColor,
    [updateColor.fulfilled]: updateColorFulfilled,
    [updateColor.rejected]: updateColorRejected,
    [deleteColor.fulfilled]: (state, action) => {
      let idToDelete = action.meta.arg;
      state.queryString = {};
      colorsAdapter.removeOne(state, idToDelete);
    },

    [fetchProducts.fulfilled]: upsetColorsFromProducts,
  },
});

export const { selectAll: selectColorsAll, selectById: selectColorById } =
  colorsAdapter.getSelectors((state) => state.admin.colors);

const selectAdminColor = (state) => state.admin.colors;

export const selectColorCreateErrors = createSelector(
  selectAdminColor,
  selectCreateErrors
);
export const selectColorUpdateErrors = createSelector(
  selectAdminColor,
  selectUpdateErrors
);
export const selectColors = createResourceSelector(
  "colors",
  ["colors"],
  denormalizeColors
);
export default colorsSlice.reducer;
