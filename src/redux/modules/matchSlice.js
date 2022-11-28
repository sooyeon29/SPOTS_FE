import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SpotsMatchApi } from "../../tools/instance";

// 예약하기! (디테일페이지에서 예약)
export const __postSpotsMatch = createAsyncThunk(
  "spotsMatch/postSpotsMatch",
  async (payload, thunkApi) => {
    // console.log("페이로드!!", payload);
    try {
      const { data } = await SpotsMatchApi.postSpotsMatch(payload);
      // console.log("너데이터누구니", data);
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

// 해당구장해당날짜 매칭완료된 예약내역 불러오기
export const __getOkMatch = createAsyncThunk(
  "spotsMatch/getOkMatch",
  async (payload, thunkApi) => {
    try {
      const { data } = await SpotsMatchApi.getOkMatch(payload);
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
      const data = await SpotsMatchApi.getMyMatch();
      console.log("내예약", data);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      console.log("내예약왜안떠", error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

// 나의 예약내역 삭제하기
export const __exitMyMatch = createAsyncThunk(
  "spotsMatch/putMyMatch",
  async (payload, thunkApi) => {
    try {
      const { data } = await SpotsMatchApi.exitMyMatch(payload);
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  // 포스트
  matcher: [],
  allmatcher: [],
  newmatcher: [],
  mymatcher: [],
  message: "",

  // 구장,날짜별
  // data: [],
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
      state.matcher.push(action.payload.data);
      Swal.fire({
        text: "매치 등록 성공",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      }).then((res) => {
        console.log(res);
        if (res.isConfirmed) {
          window.location.replace(`/reservpage`);
        }
      });
      // console.log("fulfilled 상태", state, action.payload);
      // alert(action.payload.message);
      // window.location.replace(`/reservpage`);
    },
    [__postSpotsMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if (state.error.response.status === 500) {
        Swal.fire({
          text: "필수입력값을 모두 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 400 &&
        state.error.response.data.code === -1
      ) {
        Swal.fire({
          text: "존재하지 않는 팀입니다. 팀명을 확인해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 400 &&
        state.error.response.data.code === -2
      ) {
        Swal.fire({
          text: "보유 포인트가 부족합니다. 포인트를 충전해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 400 &&
        state.error.response.data.code === -3
      ) {
        Swal.fire({
          text: "상대팀과 단식/복식이 일치해야 합니다",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 400 &&
        state.error.response.data.code === -4
      ) {
        Swal.fire({
          text: "상대팀과 인원이 일치해야 합니다",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 403 &&
        state.error.response.data.code === -1
      ) {
        Swal.fire({
          text: "해당시간은 이미 마감되었습니다.",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
      if (
        state.error.response.data.status === 403 &&
        state.error.response.data.code === -2
      ) {
        Swal.fire({
          text: "매칭 신청은 팀장만 가능합니다.",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      }
    },

    // 해당구장 해당날짜 예약 가져오기 get
    [__getAllMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllMatch.fulfilled]: (state, action) => {
      // console.log("모든매치", state, "모든매치액션", action.payload);
      state.isLoading = false;
      state.allmatcher = action.payload.data;
    },
    [__getAllMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 해당구장 해당날짜 매칭대기중예약 가져오기 get
    [__getOkMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getOkMatch.fulfilled]: (state, action) => {
      // console.log("대기중매치", action.payload);
      state.isLoading = false;
      state.newmatcher = action.payload.noneMatching;
      // console.log(state.newmatcher);
    },
    [__getOkMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // 나의 예역 가져오기 get
    [__getMyMatch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyMatch.fulfilled]: (state, action) => {
      console.log("스테잇", state, "액션", action.payload);
      state.isLoading = false;
      state.mymatcher = action.payload;
      console.log("마이메치", state.mymatcher);
    },
    [__getMyMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 나의 예약 내역 삭제하기 put
    [__exitMyMatch.pending]: (state) => {
      state.isLoading = true;
    },

    [__exitMyMatch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      console.log(action);
      Swal.fire({
        text: "예약 취소 및 포인트 반환 완료(예약 다음 날부터 취소수수료 10%가 차감됩니다)",
        width: "300px",
        confirmButtonColor: "#40d295",
        confirmButtonText: "확인",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
      // alert(action.payload.message);
    },
    [__exitMyMatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload.response.data.error);
    },
  },
});

export default matchSlice.reducer;
