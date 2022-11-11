import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PrivateApi } from '../../tools/instance';

const initialState = {
  privateSpot: [],
  isLoading: false,
  error: '',
};

export const __getPrivateSpot = createAsyncThunk(
  'getPrivateSpot',
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getPrivateSpot();
    //   console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const privateSlice = createSlice({
  name: "privateSpot",
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
  },
});

export default privateSlice.reducer;
