import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import useToggle from "../../hooks/useToggle";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import { Red } from "../signUp/Styles";

const Kakao = () => {
  const navigate = useNavigate();
  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  window.localStorage.setItem("KAKAO_CODE", KAKAO_CODE);
  // console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);

        if (res.data.code === -1) {
          localStorage.setItem("loginId", JSON.stringify(res.data.loginId));
          localStorage.setItem("profile", res.data.profileImg);
          navigate(`/addlogin`);
        }
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          navigate(`/`);
        }
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default Kakao;

const Spinner = styled.div`
  margin: auto;
`;
