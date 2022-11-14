import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Index";
import SignUp from "../pages/signUp/Index";
import MainMaps from "../pages/mainpage/Index";
import SpotsDetail from "../pages/spotsDetail/Index";
import UserPage from "../pages/userpage/Index";
import MyPage from "../pages/userpage/MyPage";
import TeamPage from "../pages/userpage/TeamPage";
import TeamDetail from "../pages/userpage/TeamDetail";
import TeamRegister from "../pages/userpage/TeamRegister";
import Reservation from "../pages/reservation/Index";
import Kakao from "../pages/login/Kakao";
import Hosting from "../pages/userpage/Hosting";
import SwitchAccount from "../pages/login/SwitchAccount";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainMaps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage" element={<TeamPage />} />
        <Route path="/teamdetail/:id" element={<TeamDetail />} />
        <Route path="/teamregister" element={<TeamRegister />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/spotsdetail/:id" element={<SpotsDetail />} />
        <Route path="/book" element={<Reservation />} />
        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/switchaccount" element={<SwitchAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
