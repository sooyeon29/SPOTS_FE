import { createAsyncThunk } from '@reduxjs/toolkit';
import { PrivateApi } from '../../tools/instance';

export const __getPrivateSpot = createAsyncThunk(
  'getPrivateSpot',
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getPrivateSpot();
      return console.log(data);
    } catch (error) {
      return console.log(error);
    }
  }
);
