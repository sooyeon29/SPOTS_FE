import { configureStore } from "@reduxjs/toolkit";
import matcher from "../modules/matchSlice";
import user from "../modules/userSlice";
import privateSpot from "../modules/privateSlice"

const store = configureStore({
  reducer: {
    user: user,
    matcher: matcher,
    privateSpot: privateSpot,
  },

  devTools: process.env.NODE_ENV === "development",
});

export default store;
