import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserpageAPI } from "../../tools/instance";

const initialState = {
  user: [],
  team: [],
  isLoading: false,
  error: "",
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMypage();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyteam = createAsyncThunk(
  "getMyteam",
  async (payload, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMyteamList();
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyteamDatil = createAsyncThunk(
  "getMyteamDetail",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await UserpageAPI.getMyteamDetail(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: {
    [__getMyInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyInfo.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [__getMyteam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyteam.fulfilled]: (state, action) => {
      state.team = action.payload;
    },
    [__getMyteam.rejected]: (state, action) => {
      console.log(action.payload.response.data.errorMessage);
      state.error = action.payload.response.data.errorMessage;
      alert(state.error);
    },
    [__getMyteamDatil.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyteamDatil.fulfilled]: (state, action) => {},
    [__getMyteamDatil.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
