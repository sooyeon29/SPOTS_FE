import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi, PublicApi, SearchApi } from "../../tools/instance";

const initialState = {
  privateSpot: [],
  myPrivateSpot: [],
  publicSpot: [],
  message: "",
  isLoading: false,
  error: "",
};

export const __getPrivateSpot = createAsyncThunk(
  "getPrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getPrivateSpot();
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 내가 등록한 구장
export const __getMyPrivateSpot = createAsyncThunk(
  "getMyPrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.getMyPrivateSpot(payload);
      // console.log(data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 내가 등록한 구장 삭제
export const __deletePrivateSpot = createAsyncThunk(
  "deletePrivateSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PrivateApi.deletePrivateSpot(payload);
      console.log("삭제할때 데이타!!", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 내가 등록학 구장 수정
export const __editPrivateSpot = createAsyncThunk(
  "editPrivateSpot",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const { data } = await PrivateApi.editPrivateSpot(payload);
      console.log("수정할때 데이타!!", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPublicSpot = createAsyncThunk(
  "getPublicSpot",
  async (payload, thunkAPI) => {
    try {
      const { data } = await PublicApi.getPublicSpot();
      // console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getSearchedSpot = createAsyncThunk(
  "getSearchedSpots",
  async (payload, thunkAPI) => {
    try {
      const { data } = await SearchApi.getSearchedSpot(payload);
      // console.log("----데이터----", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getAllSpot = createAsyncThunk(
  "getAllSpots",
  async (_, thunkAPI) => {
    try {
      const { data } = await SearchApi.getAllSpot();
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const privateSlice = createSlice({
  name: "spots",
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
    // 내가 등록한 구장 가져오기
    [__getMyPrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getMyPrivateSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   console.log(action.payload)
      state.myPrivateSpot = action.payload;
    },
    [__getMyPrivateSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 내가 등록한 구장 삭제하기
    [__deletePrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deletePrivateSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPrivateSpot = state.myPrivateSpot.filter(
        (privSpot) => action.payload !== privSpot.placesId
      );
      alert("나의 구장이 삭제되었습니다.");
    },
    [__deletePrivateSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(state.error);
    },
    // 내가 등록한 구장 수정하기
    [__editPrivateSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__editPrivateSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      alert(action.payload.message);
      console.log(action.payload.data);
      state.myPrivateSpot = state.myPrivateSpot.map((spot) =>
        spot.placesId === action.payload.data.placesId
          ? {
              ...spot,
              spotName: action.payload.data.spotName,
              desc: action.payload.data.desc,
              price: action.payload.data.price,
            }
          : spot
      );
    },
    [__editPrivateSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      alert(action.payload);
    },

    [__getPublicSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPublicSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.publicSpot = action.payload;
    },
    [__getPublicSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__getSearchedSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getSearchedSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchedSpot = action.payload;
    },
    [__getSearchedSpot.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getAllSpot.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getAllSpot.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allSpot = action.payload;
    },
    [__getAllSpot.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default privateSlice.reducer;
