import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";

const MainMaps = lazy(() => import("../pages/mainpage/Index"));
const Reservation = lazy(() => import("../pages/reservation/Index"));
const SpotsDetail = lazy(() => import("../pages/spotsDetail/Index"));
const Chatting = lazy(() => import("../pages/chat/Chatting"));
const AdminHome = lazy(() => import("../pages/chat/AdminHome"));
const AdminChat = lazy(() => import("../pages/chat/AdminChat"));
const ScrollToTop = lazy(() => import("../components/ScrollTop"));
const Login = lazy(() => import("../pages/login/Index"));
const Kakao = lazy(() => import("../pages/login/Kakao"));
const Google = lazy(() => import("../pages/login/Google"));
const FindId = lazy(() => import("../pages/login/FindId"));
const FindPw = lazy(() => import("../pages/login/FindPw"));
const SignUp = lazy(() => import("../pages/signUp/Index"));
const SocialSignUp = lazy(() => import("../pages/signUp/SocialSignUp"));
const Welcome = lazy(() => import("../components/Welcome"));
const SwitchAccount = lazy(() => import("../pages/login/SwitchAccount"));
const UserPage = lazy(() => import("../pages/userpage/Index"));
const MyPage = lazy(() => import("../pages/userpage/mypage/MyPage"));
const TeamPage = lazy(() => import("../pages/userpage/myteam/TeamPage"));
const TeamDetail = lazy(() => import("../pages/userpage/myteam/TeamDetail"));
const TeamRegister = lazy(() =>
  import("../pages/userpage/myteam/TeamRegister")
);
const HostList = lazy(() => import("../pages/userpage/myhost/HostList"));
const HostDetail = lazy(() => import("../pages/userpage/myhost/HostDetail"));
const Hosting = lazy(() => import("../pages/userpage/myhost/Hosting"));
const ReservPage = lazy(() => import("../pages/userpage/mybook/ReservPage"));

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
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
          <Route path="/addlogin" element={<SocialSignUp />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/adminchat" element={<AdminChat />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chatting" element={<Chatting />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
