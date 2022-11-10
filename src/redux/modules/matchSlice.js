import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SpotsMatchApi } from "../../tools/instance";

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

const initialState = {
  matcher: {
    place: "",
    date: "",
    matchId: "",
    // isDouble: false,
    teamName: "",
    member: 0,
  },
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
      console.log("스테이트는?", state);
      state.matcher.push(action.payload);
      console.log("fulfilled 상태", state, action);
    },
    [__postSpotsMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default matchSlice.reducer;
