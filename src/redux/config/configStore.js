import { configureStore } from "@reduxjs/toolkit";
import search from "../modules/searchSlice";

const store = configureStore({
  reducer: {
    data: search,
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
