import { configureStore } from "@reduxjs/toolkit";
import {
  setDate,
  setDouble,
  setMember,
  setPlace,
  setTeamName,
  setTimeTeam,
} from "../modules/matchSlice";
import user from "../modules/userSlice";

const store = configureStore({
  reducer: {
    user: user,
    setDate: setDate,
    setDouble: setDouble,
    setMember: setMember,
    setPlace: setPlace,
    setTeamName: setTeamName,
    setTimeTeam: setTimeTeam,
  },

  devTools: process.env.NODE_ENV === "development",
});

export default store;
