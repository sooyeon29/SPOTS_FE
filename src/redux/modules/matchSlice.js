import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SpotsMatchApi } from "../../tools/instance";

// 예약하기! (디테일페이지에서 예약)
export const __postSpotsMatch = createAsyncThunk(
  "spotsMatch/postSpotsMatch",
  async (payload, thunkApi) => {
    console.log("페이로드!!", payload);
    try {
      const { data } = await SpotsMatchApi.postSpotsMatch(payload);
      console.log("너데이터누구니", data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 나의 예약내역 불러오기
export const __getMyMatch = createAsyncThunk(
  "spotsMatch/getMyMatch",
  async (payload, thunkApi) => {
    try {
      const { data } = await SpotsMatchApi.getMyMatch(payload);
      console.log("내예약", data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 해당구장해당날짜 예약내역 불러오기
export const __getAllMatch = createAsyncThunk(
  "spotsMatch/getAllMatch",
  async (payload, thunkApi) => {
    try {
      const { data } = await SpotsMatchApi.getAllMatch(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  // 포스트
  matcher: [],
  // 내꺼겟
  myMatch: [],
  // 구장,날짜별
  data: [],
  isLoading: false,
  error: null,
};

const matchSlice = createSlice({
  name: "MATCHER",
  initialState,
  reducers: {},
  extraReducers: {
    // 비동기적인 액션은 엑스트라리듀서에서 관리
    // 예약하기 POST! (매칭을 위해 포스트!)
    [__postSpotsMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSpotsMatch.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("액션?", action.payload);
      state.matcher.push(action.payload.data);
      console.log("fulfilled 상태", state, action);
    },
    [__postSpotsMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 나의 예역 가져오기 get
    [__getMyMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyMatch.fulfilled]: (state, action) => {
      console.log("스테잇", state, "액션", action);
      state.isLoading = false;
      state.myMatch = action.payload.myMatch;
      // console.log(state.data);
    },
    [__getMyMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 해당구장 해당날짜 예약 가져오기 get
    [__getAllMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllMatch.fulfilled]: (state, action) => {
      console.log(state);
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [__getAllMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default matchSlice.reducer;
