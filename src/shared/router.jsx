import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Index";
import SignUp from "../pages/signUp/Index";
import MainMaps from "../pages/mainpage/Index";
import SpotsDetail from "../pages/spotsDetail/Index";
import MyPage from "../pages/userpage/MyPage";
import TeamPage from "../pages/userpage/TeamPage";
import TeamDetail from "../pages/userpage/TeamDetail";
import TeamRegister from "../pages/userpage/TeamRegister";
import Reservation from "../pages/reservation/Index";
import Kakao from "../pages/login/Kakao";
import Hosting from "../pages/userpage/Hosting";
import SwitchAccount from "../pages/login/SwitchAccount";
import ReservPage from "../pages/userpage/ReservPage";
import HostList from "../pages/userpage/HostList";
import HostDetail from "../pages/userpage/HostDetail";
import FindPw from "../pages/login/FindPw";
import FindId from "../pages/login/FindId";
import ChatRoom from "../pages/chat/ChatRoom";
import KakaoAdd from "../pages/login/KakaoAdd";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainMaps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/teamdetail/:id" element={<TeamDetail />} />
        <Route path="/teamregister" element={<TeamRegister />} />
        <Route path="/reservpage" element={<ReservPage />} />
        <Route path="/spotsdetail/:id" element={<SpotsDetail />} />
        <Route path="/book" element={<Reservation />} />
        <Route path="/book/:keywords" element={<Reservation />} />
        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/switchaccount" element={<SwitchAccount />} />
        <Route path="/hostlist" element={<HostList />} />
        <Route path="/hostdetail/:id" element={<HostDetail />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/addlogin" element={<KakaoAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
