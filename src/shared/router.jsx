import SignUp from "../pages/signUp/Index";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Index";
import MainMaps from "../pages/mainpage/Index";
import SpotsDetail from "../pages/spotsDetail/Index";
import UserPage from "../pages/userpage/Index";
import TeamDetail from "../pages/userpage/TeamDetail";
import Reservation from "../pages/reservation/Index";
import Main from "../pages/mainpage/trying";
import Booktwo from "../pages/reservation/Booktwo";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<MainMaps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/spotsdetail" element={<SpotsDetail />} />
        <Route path="/teamdetail" element={<TeamDetail />} />
        <Route path="/book" element={<Reservation />} />
        <Route path="/maintest" element={<Main />} />
        <Route path="/booktwo" element={<Booktwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
