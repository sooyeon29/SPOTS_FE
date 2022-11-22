import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import { Red } from "../signUp/Styles";

const Kakao = () => {
  // console.log(window.location.href);
  // const [isLogin, setIsLogin] = useState(false);
  const [isCode, setIsCode] = useToggle();
  const navigate = useNavigate();
  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  // console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        // console.log(res);
        // localStorage.setItem("token", JSON.stringify(res.data));
        // const isMember = localStorage.getItem("token");
        // if (res.data.code === 1) {
        localStorage.setItem("loginId", JSON.stringify(res.data.loginId));
        if (res.status === 200) navigate(`/`);
      })

      .catch((err) => console.log(err));
  }, []);

  return <>...로딩중</>;
};

export default Kakao;
