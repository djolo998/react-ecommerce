import { createSlice } from "@reduxjs/toolkit";
import {
  upsetNormalizedSlice,
  createCrudAsyncThunkFunctions,
  createResourceSelector,
} from "./util";
import { usersAdapter } from "./adapter";
import { fetchOrders } from "./ordersSlice";
import { normalizeUsers, denormalizeUsers } from "../../../normalizr";

const upsetNormalizedUsers = upsetNormalizedSlice("users");

export const { fetchMultypleResources: fetchUsers } =
  createCrudAsyncThunkFunctions({
    name: "user",
    url: "users",
    multypleResourceNormalized: normalizeUsers,
  });

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    update: { errors: null },
    create: { errors: null },
    queryString: {},
    isLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: upsetNormalizedUsers,
    [fetchOrders.fulfilled]: upsetNormalizedUsers,
  },
});

export const selectUsers = createResourceSelector(
  "users",
  ["users"],
  denormalizeUsers
);

export default usersSlice.reducer;
