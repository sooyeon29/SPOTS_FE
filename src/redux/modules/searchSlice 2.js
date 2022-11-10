// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BookApi } from "../../tools/instance";

// export const __getSearch = createAsyncThunk(
//   "search/getSearch",
//   async (payload, thunkApi) => {
//     try {
//       const { data } = await BookApi.getSearch(payload);
//       return thunkApi.fulfillWithValue(data);
//     } catch (error) {
//       return thunkApi.rejectWithValue(error);
//     }
//   }
// );

// const initialState = {
//   data: {},
//   isLoading: false,
//   error: null,
// };

// const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   __getSearch: {
//     [__getSearch.pending]: (state) => {
//       state.isLoading = true;
//     },
//     [__getSearch.fulfilled]: (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload.data;
//     },
//     [__getSearch.rejected]: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });
// export default searchSlice.reducer;
