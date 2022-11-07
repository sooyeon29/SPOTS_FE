import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/userSlice";

const store = configureStore({
  reducer: { user: user },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
