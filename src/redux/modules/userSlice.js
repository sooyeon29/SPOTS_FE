import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { UserpageAPI } from "../../tools/instance";

const initialState = {
  user: [],
  team: [],
  isLoading: false,
  error: "",
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (paylaod, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMypage();
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyteam = createAsyncThunk(
  "getMyteam",
  async (paylaod, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMyteam();
      console.log(data);
      return thunkAPI.fulfillWithValue(data.teamName);
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
      //state.team.push(action.paylaod.user.teamName);
      //console.log(state.team);
      console.log(state.user);
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.error = action.paylaod;
    },
    [__getMyteam.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyteam.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.team.push(action.payload.team);
      console.log(current(state.team));
    },
  },
});

export default userSlice.reducer;
