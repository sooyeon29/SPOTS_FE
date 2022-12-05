import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Index';
import SignUp from '../pages/signUp/Index';
import MainMaps from '../pages/mainpage/Index';
import SpotsDetail from '../pages/spotsDetail/Index';
import MyPage from '../pages/userpage/MyPage';
import TeamPage from '../pages/userpage/TeamPage';
import TeamDetail from '../pages/userpage/TeamDetail';
import TeamRegister from '../pages/userpage/TeamRegister';
import Reservation from '../pages/reservation/Index';
import Kakao from '../pages/login/Kakao';
import Hosting from '../pages/userpage/Hosting';
import SwitchAccount from '../pages/login/SwitchAccount';
import ReservPage from '../pages/userpage/ReservPage';
import HostList from '../pages/userpage/HostList';
import HostDetail from '../pages/userpage/HostDetail';
import FindPw from '../pages/login/FindPw';
import FindId from '../pages/login/FindId';
import KakaoAdd from '../pages/login/KakaoAdd';
import UserPage from '../pages/userpage/Index';
import AdminHome from '../pages/chat/AdminHome';
import AdminChat from '../pages/chat/AdminChat';
import Welcome from '../components/Welcome';
import Chatting from '../pages/chat/Chatting';
import Google from '../pages/login/Google';
import ScrollToTop from '../components/ScrollTop';
//import ChatStart from "../pages/chat/ChatStartBtn";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainMaps />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/teamdetail/:id" element={<TeamDetail />} />
        <Route path="/teamregister" element={<TeamRegister />} />
        <Route path="/reservpage" element={<ReservPage />} />
        <Route path="/spotsdetail/:id" element={<SpotsDetail />} />
        <Route path="/book" element={<Reservation />} />
        <Route path="/book/:keywords" element={<Reservation />} />
        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/auth/google/callback" element={<Google />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/switchaccount" element={<SwitchAccount />} />
        <Route path="/hostlist" element={<HostList />} />
        <Route path="/hostdetail/:id" element={<HostDetail />} />
        <Route path="/addlogin" element={<KakaoAdd />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminchat" element={<AdminChat />} />
        <Route path="/welcome" element={<Welcome />} />
        {<Route path="/chatting" element={<Chatting />} />}
        {/*<Route path="/chatting" element={<ChatStart />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
