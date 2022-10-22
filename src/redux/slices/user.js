import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk("auth/fetchUser", async (params) => {
  const { data } = await axios.get(`/user/${params}`);
  return data;
});

const initialState = {
  data: null,
  status: "loading",
};

const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUser.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const getUserReducer = getUserSlice.reducer;
