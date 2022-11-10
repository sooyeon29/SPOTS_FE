import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  matcher: {
    matchId: "221107t13",
    place: "한사랑풋살장",
    teamName: "항해풋살회",
    member: 5,
    date: "2022-11-07",
    time: "",
    isDouble: false,
  },
  isLoading: false,
  error: null,
};

const matchSlice = createSlice({
  name: "MATCHER",
  initialState,
  reducers: {
    // 동기적인 액션은 리듀서에서 관리
    // 예약하기를 원하는 구장 선택
    setPlace: (state, action) => {
      state.matcher.place.push(action.payload);
    },
    // 매치를 위해 선택한 날짜
    setDate: (state, action) => {
      console.log("동기동기리듀서", action.payload);
      console.log(state);
      state.matcher.date.push(action.payload);
    },
    // 매치를 위해 선택한팀(시간+1or2팀)
    setTimeTeam: (state, action) => {
      //   const time = action.payload;
      state.matcher.time.push(action.payload);
    },
    // 우리팀 인원(등록한 팀인원수를 가져옴)
    setMember: (state, action) => {
      //   const member = action.payload;
      state.matcher.member.push(action.payload);
    },
    // 단식or복식 선택
    setDouble: (state, action) => {
      //   const double = action.payload;
      state.matcher.isDouble.push(action.payload);
    },
    // 나의 팀들 중 매치 신청을 원하는 팀 선택
    setTeamName: (state, action) => {
      //   const teamName = action.payload;
      state.matcher.teamName.push(action.payload);
    },
  },
  extraReducers: {
    // 비동기적인 액션은 엑스트라리듀서에서 관리
  },
});

export const {
  setPlace,
  setDate,
  setTimeTeam,
  setMember,
  setDouble,
  setTeamName,
} = matchSlice.actions;
// export default addPartySlice.reducer;
