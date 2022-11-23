import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserpageAPI } from "../../tools/instance";

const initialState = {
  user: [],
  team: [],
  teamdetail: [],
  isLoading: false,
  error: "",
};

export const __getMyInfo = createAsyncThunk(
  "getMyInfo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMypage();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyteamList = createAsyncThunk(
  "getMyteam",
  async (payload, thunkAPI) => {
    try {
      const { data } = await UserpageAPI.getMyteamList();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMyteamDetail = createAsyncThunk(
  "getMyteamDetail",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await UserpageAPI.getMyteamDetail(payload);
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
      localStorage.setItem("point", action.payload.user.point);
    },
    [__getMyInfo.rejected]: (state, action) => {
      state.error = action.payload;
      console.log(state.error);
    },
    [__getMyteamList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyteamList.fulfilled]: (state, action) => {
      state.team = action.payload;
    },
    [__getMyteamList.rejected]: (state, action) => {
      state.error = action.payload.response.data;
      if (action.payload.response.status === 401) {
        alert("예약은 로그인 후 이용 가능합니다.");
      }
      // console.log(state.error.status);
      // if (state.error.status === 404) {
      //   alert("팀 등록을 먼저 해주세요");
      // }
      // console.log("요기에러------------", action.payload);
      if (action.payload.response.status === 401) {
        alert("예약은 로그인 후 이용 가능합니다.");
      }
      // if (action.payload.response.status === 404) {
      //   alert("등록한 팀이 없습니다. 예약은 팀등록 이후 가능합니다.");
      // }
      // else alert(state.error);
    },
    [__getMyteamDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyteamDetail.fulfilled]: (state, action) => {
      state.teamdetail = action.payload;
    },
    [__getMyteamDetail.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
