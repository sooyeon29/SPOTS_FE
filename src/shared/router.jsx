import SignUp from "../pages/signUp/Index";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Index";
import Main from "../pages/mainpage/Index";
import SpotsDetail from "../pages/spotsDetail/index";
import UserPage from "../pages/userpage/Index";
import TeamDetail from "../pages/userpage/TeamDetail";
import TeamRegister from "../pages/userpage/TeamRegister";
import Reservation from "../pages/reservation/Index";
import Maps2 from "../pages/mainpage/Maps2";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/spotsdetail" element={<SpotsDetail />} />
        <Route path="/teamdetail" element={<TeamDetail />} />
        <Route path="/teamregister" element={<TeamRegister />} />
        <Route path="/book" element={<Reservation />} />
        <Route path="/map" element={<Maps2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
