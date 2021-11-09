import { createSlice } from "@reduxjs/toolkit";

import {
  normalizeAndUpsetSlice,
  createCrudAsyncThunkFunctions,
  upsetNormalizedSlice,
} from "./util";

import { genresAdapter } from "./adapter";

import { fetchProducts } from "./productsSlice";

export const { fetchMultypleResources: fetchGenres } =
  createCrudAsyncThunkFunctions({
    name: "genre",
    url: "genres",
  });

const upsetGenresFromProducts = upsetNormalizedSlice("genres");

const genresSlice = createSlice({
  name: "genres",
  initialState: genresAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchGenres.fulfilled]: (state, action) => {
      genresAdapter.upsertMany(state, action.payload);
    },
    [fetchProducts.fulfilled]: upsetGenresFromProducts,
  },
});

export default genresSlice.reducer;
