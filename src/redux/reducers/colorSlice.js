import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchColors = createAsyncThunk(
  "ui/fetchColors",
  async (qs = "") => {
    return await axios(`/colors`);
  }
);

const initialState = {
  isLoading: false,
  items: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchColors.pending]: startLoading,
    [fetchColors.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
  },
});
export default colorSlice.reducer;
