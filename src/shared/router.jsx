import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Login from "../pages/login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
