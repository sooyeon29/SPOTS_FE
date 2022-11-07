import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserpageAPI } from "../../tools/instance";

const initialState = {
  data: [],
  isLoading: false,
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (paylaod, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMypage();
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
    [__getMyInfo.fulfilled]: (state, action) => {},
    [__getMyInfo.rejected]: (state, action) => {},
  },
});

export default userSlice.reducer;
