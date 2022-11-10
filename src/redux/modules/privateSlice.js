import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi } from "../../tools/instance";

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

export const __getPrivateSpot = createAsyncThunk(
  "getPrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getPrivateSpot();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return console.log(error);
    }
  }
);

const privateSlice = createSlice({
  name: "private",
  initialState,
  reducer: {},
  extraReducers: {
    [__getPrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPrivateSpot.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getPrivateSpot.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default privateSlice.reducer;
