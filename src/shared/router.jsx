import SignUp from '../pages/signUp/Index';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Login from "../pages/login/Index";
import MainMaps from "../pages/mainpage/MainMaps";
import SpotsDetail from "../pages/spotsDetail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        {/* <Route path="/" element={<Header />} /> */}
        <Route path="/" element={<MainMaps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spotsdetail" element={<SpotsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
