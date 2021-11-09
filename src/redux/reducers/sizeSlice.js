import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchSizes = createAsyncThunk("ui/fetchSizes", async (qs = "") => {
  return await axios(`/sizes`);
});

const initialState = {
  isLoading: false,
  items: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSizes.pending]: startLoading,
    [fetchSizes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
  },
});
export default sizeSlice.reducer;
