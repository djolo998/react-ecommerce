import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import i18n from "i18next";

const initialState = {
  show: false,
};

const startLoading = (state) => {
  state.isLoading = true;
};

const toastDefaultObject = {
  position: "bottom-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const getMessageFromAction = (state, action) => {
  const { type } = action;
  const key = "toast." + type.replaceAll("/", ".").replace(".fulfilled", "");
  toast.dark(getValue(key), toastDefaultObject);
};

const getValue = (key) => i18n.t(key);

const getActionName = (actionTemplateName, value) => {
  return actionTemplateName.replace("actionName", value);
};

const createActionsObject = (actionsNamesArray) => (actionTemplateName) => {
  return actionsNamesArray.reduce((acc, cv) => {
    let template = actionTemplateName;
    let actionName = getActionName(template, cv);
    acc[actionName] = getMessageFromAction;
    return acc;
  }, {});
};

const cartActions = [
  "addToCart",
  "updateCart",
  "deleteCartItem",
  "createOrder",
];

const cartActionsTemplates = "cart/actionName/fulfilled";
const cartActionsReducers =
  createActionsObject(cartActions)(cartActionsTemplates);
const adminActions = [
  "deleteProduct",
  "deleteBrand",
  "deleteCategory",
  "updateProduct",
  "updateBrand",
  "updateCategory",
  "addNewProduct",
  "addNewBrand",
  "addNewCategory",
];

const adminActionsTemplates = "admin/actionName/fulfilled";
const adminActionsReducers = createActionsObject(adminActions)(
  adminActionsTemplates
);

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {},
  extraReducers: {
    ...cartActionsReducers,
    ...adminActionsReducers,
  },
});

export default toastSlice.reducer;
