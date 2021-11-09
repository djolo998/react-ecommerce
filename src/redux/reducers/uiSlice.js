import { createSelector, createSlice, createAction } from "@reduxjs/toolkit";

const handle404ApiError = (state, action) => {
  state.is404ApiError = true;
};

const initialState = {
  isLoading: false,
  theme: "light",
  is404ApiError: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: {
    "ui/fetchProduct/rejected": handle404ApiError,
    "admin/fetchBrand/rejected": handle404ApiError,
  },
});
export default uiSlice.reducer;

export const getTheme = createSelector(
  (state) => state.ui.theme,
  (theme) => theme
);

export const changeTheme = createAction("ui/changeTheme");
