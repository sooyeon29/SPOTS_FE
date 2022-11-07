import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '../pages/userpage/Index';
import Login from '../pages/logIn/Index';
import SignUp from '../pages/signUp/Index';
import SpotsDetail from '../pages/spotsDetail';
import MainMaps from '../pages/mainpage/Index';
import Reservation from '../pages/reservation/Index';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainMaps />} />
        <Route path='/book' element={<Reservation />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<Index />} />
        <Route path='/spotsdetail' element={<SpotsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
