import { createSlice } from "@reduxjs/toolkit";

import { createCrudAsyncThunkFunctions } from "./util";

import { sizesAdapter } from "./adapter";

export const { fetchMultypleResources: fetchSizes } =
  createCrudAsyncThunkFunctions({
    name: "size",
    url: "sizes",
  });

//  { fetchColor, deleteColor, fetchColors, addNewColor, updateColor };

const sizesSlice = createSlice({
  name: "sizes",
  initialState: sizesAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchSizes.fulfilled]: (state, action) => {
      sizesAdapter.upsertMany(state, action.payload);
    },
  },
});

export default sizesSlice.reducer;
