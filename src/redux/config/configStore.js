import { configureStore } from "@reduxjs/toolkit";
import matcher from "../modules/matchSlice";
import user from "../modules/userSlice";
import spots from "../modules/spotsSlice"

const store = configureStore({
  reducer: {
    user: user,
    matcher: matcher,
    spots: spots
  },

  devTools: process.env.NODE_ENV === "development",
});

export default store;
