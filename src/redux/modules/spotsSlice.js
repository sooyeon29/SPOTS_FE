import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi, PublicApi } from "../../tools/instance";

const initialState = {
  privateSpot: [],
  myPrivateSpot: [],
  publicSpot: [],
  isLoading: false,
  error: "",
};

export const __getPrivateSpot = createAsyncThunk(
  "getPrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getPrivateSpot();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 내가 등록한 구장
export const __getMyPrivateSpot = createAsyncThunk(
  "getMyPrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getMyPrivateSpot(payload);
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPublicSpot = createAsyncThunk(
  "getPublicSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PublicApi.getPublicSpot();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const privateSlice = createSlice({
  name: "spots",
  initialState,
  reducer: {},
  extraReducers: {
    [__getPrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPrivateSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   console.log(action.payload)
      state.privateSpot = action.payload;
    },
    [__getPrivateSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 내가 등록한 구장 가져오기
    [__getMyPrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyPrivateSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   console.log(action.payload)
      state.myPrivateSpot = action.payload;
    },
    [__getMyPrivateSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPublicSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPublicSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.publicSpot = action.payload;
    },
    [__getPublicSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default privateSlice.reducer;
