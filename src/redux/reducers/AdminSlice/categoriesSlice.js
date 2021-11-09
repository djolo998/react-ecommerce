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
  createCrudAsyncThunkFunctions,
  createAddNewResourceRejected,
  createAddNewResourceFulfilled,
  selectCreateErrors,
  selectUpdateErrors,
  upsetNormalizedSlice,
} from "./util";

import {
  normalizeCategories,
  normalizeCategory,
  denormalizeCategories,
} from "../../../normalizr";

import { categoriesAdapter } from "./adapter";

import { fetchProducts } from "./productsSlice";

//updateResource
const updateCategoryRejected = createUpdateResourceRejected("categories");
const updateCategoryFulfilled = createUpdateResourceFulfilled("categories");

//AddNewResource
const addNewCategoryRejected = createAddNewResourceRejected("categories");
const addNewCategoryFulfilled = createAddNewResourceFulfilled("categories");

const normalizeAndUpsetCategory = normalizeAndUpsetSlice(
  normalizeCategory,
  "categories"
);
const normalizeAndUpsetCategorySlice = normalizeAndUpsetSlice(
  normalizeCategories,
  "categories"
);

export const {
  fetchSingleResource: fetchCategory,
  deleteResource: deleteCategory,
  fetchMultypleResources: fetchCategories,
  addNewResource: addNewCategory,
  updateResource: updateCategory,
} = createCrudAsyncThunkFunctions({
  name: "category",
  url: "categories",
});

const upsetCategoriesFromProducts = upsetNormalizedSlice("categories");

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [addNewCategory.fulfilled]: addNewCategoryFulfilled,
    [addNewCategory.rejected]: addNewCategoryRejected,
    [fetchCategories.fulfilled]: normalizeAndUpsetCategorySlice,
    [fetchCategory.fulfilled]: normalizeAndUpsetCategory,
    [updateCategory.fulfilled]: updateCategoryFulfilled,
    [updateCategory.rejected]: updateCategoryRejected,
    [deleteCategory.fulfilled]: (state, action) => {
      let idToDelete = action.meta.arg;
      state.queryString = {};
      categoriesAdapter.removeOne(state, idToDelete);
    },
    [fetchProducts.fulfilled]: upsetCategoriesFromProducts,
  },
});

export const {
  selectEntities: selectCategoriesEntities,
  selectAll: selectCategoriesAll,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.admin.categories);

const selectAdminCategories = (state) => state.admin.categories;

export const selectCategoryCreateErrors = createSelector(
  selectAdminCategories,
  selectCreateErrors
);
export const selectCategoryUpdateErrors = createSelector(
  selectAdminCategories,
  selectUpdateErrors
);
export const selectCategories = createResourceSelector(
  "categories",
  ["categories"],
  denormalizeCategories
);
export default categoriesSlice.reducer;
