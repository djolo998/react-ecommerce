import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios, { setToken } from "../../axios";

export const login = createAsyncThunk(
  "ui/login",
  async (data, { rejectWithValue }) => {
    try {
      return await axios({
        method: "post",
        url: "/login",
        data: JSON.stringify(data),
      });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "ui/register",
  async (data, { rejectWithValue }) => {
    try {
      return await axios({
        method: "post",
        url: "/register",
        data: JSON.stringify(data),
      });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("ui/logout", async () => {
  return await axios(`/logout`);
});

const initialState = {
  isLoading: false,
  user: null,
  isAdmin: false,
  isLoggedIn: false,
  errors: {},
};

const startLoading = (state) => {
  state.isLoading = true;
};

const authFulfilled = (state, action) => {
  state.isLoggedIn = true;
  state.errors = {};
  localStorage.setItem("api_token", action.payload.api_token);
  setToken(action.payload.api_token);
  state.user = { ...action.payload };
};
const authRejected = (state, action) => {
  state.errors = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: startLoading,
    [login.fulfilled]: authFulfilled,
    [login.rejected]: authRejected,
    [logout.pending]: startLoading,
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.errors = {};
      localStorage.removeItem("api_token");
      setToken();
      state.user = null;
    },
    [logout.rejected]: authRejected,
    [register.fulfilled]: authFulfilled,
    [register.rejected]: authRejected,
  },
});
export default authSlice.reducer;
