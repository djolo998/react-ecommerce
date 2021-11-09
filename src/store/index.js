import { configureStore, combineReducers } from "@reduxjs/toolkit";

import brandReducer from "../redux/reducers/brandSlice";
import colorReducer from "../redux/reducers/colorSlice";
import categoryReducer from "../redux/reducers/categorySlice";
import productsReducer from "../redux/reducers/productsSlice";
import sizeReducer from "../redux/reducers/sizeSlice";
import authReducer from "../redux/reducers/authSlice";
import uiReducer from "../redux/reducers/uiSlice";
import cartReducer from "../redux/reducers/cartSlice";
import orderReducer from "../redux/reducers/orderSlice";
import toastReducer from "../redux/reducers/toastSlice";

//Admin
import adminBrandsReducer from "../redux/reducers/AdminSlice/brandsSlice";
import adminProductsReducer from "../redux/reducers/AdminSlice/productsSlice";

import adminColorsReducer from "../redux/reducers/AdminSlice/colorsSlice";
import adminCategoriesReducer from "../redux/reducers/AdminSlice/categoriesSlice";

import adminSizesReducer from "../redux/reducers/AdminSlice/sizesSlice";
import adminGenresReducer from "../redux/reducers/AdminSlice/genresSlice";
import adminOrdersReducer from "../redux/reducers/AdminSlice/ordersSlice";
import adminStatusReducer from "../redux/reducers/AdminSlice/statusSlice";
import adminUsersReducer from "../redux/reducers/AdminSlice/usersSlice";

let admin = combineReducers({
  brands: adminBrandsReducer,
  products: adminProductsReducer,
  categories: adminCategoriesReducer,
  colors: adminColorsReducer,
  genres: adminGenresReducer,
  sizes: adminSizesReducer,
  orders: adminOrdersReducer,
  status: adminStatusReducer,
  users: adminUsersReducer,
});

const configStore = (preloadedState = {}) => {
  let store = configureStore({
    reducer: {
      brands: brandReducer,
      colors: colorReducer,
      products: productsReducer,
      categories: categoryReducer,
      sizes: sizeReducer,
      auth: authReducer,
      ui: uiReducer,
      cart: cartReducer,
      order: orderReducer,
      admin,
      toast: toastReducer,
    },
    preloadedState,
  });
  return store;
};

export default configStore;
