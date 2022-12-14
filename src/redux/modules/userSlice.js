import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserpageAPI } from "../../tools/instance";
import Swal from "sweetalert2";

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
        Swal.fire({
          text: "예약은 로그인 후 사용 가능합니다",
          width: "340px",
          showCancelButton: true,
          confirmButtonText: "로그인",
          confirmButtonColor: "#40d295",
          cancelButtonColor: "#FF00B4",
          cancelButtonText: "둘러보기",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace(`/login`);
          }
        });
      }
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
