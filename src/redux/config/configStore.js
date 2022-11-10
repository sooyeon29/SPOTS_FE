import { configureStore } from "@reduxjs/toolkit";
import matcher from "../modules/matchSlice";
import user from "../modules/userSlice";

const store = configureStore({
  reducer: {
    user: user,
    matcher: matcher,
  },

  devTools: process.env.NODE_ENV === "development",
});

export default store;
