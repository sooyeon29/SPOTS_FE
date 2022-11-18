import { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MainMapLayout from "../../components/MainMapLayout";
import SpotsMap from "./SpotsMap";
import { UpperLine, BtnWrap } from "./Styles";
import TapBar from "../../components/TapBar";
import { LoginAPI } from "../../tools/instance";
import { useNavigate } from "react-router-dom";

const MainMaps = () => {
  const [sportsKind, setSportsKind] = useState("");
  const navigate = useNavigate();
  const futsal = "풋살장";
  const tennis = "테니스장";
  const badminton = "배드민턴장";

  useEffect(() => {
    const isMember = localStorage.getItem("loginId");
    console.log(isMember);
    LoginAPI.kakaoId(isMember)
      .then((res) => {
        console.log("여기===========================", res);
        if (res.data.loginId === null) return;

        if (res.data.loginId && !res.data.nickname) {
          navigate(`/addlogin`);
        }
        // return;
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          return;
        } else {
          // navigate(`/addlogin`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Layout>
        <Header />
        <Banner />
        {/* <MainMapLayout> */}
        <UpperLine>
          <BtnWrap>
            <button onClick={() => setSportsKind(futsal)}>풋살</button>
            <button onClick={() => setSportsKind(tennis)}>테니스</button>
            <button onClick={() => setSportsKind(badminton)}>배드민턴</button>
          </BtnWrap>
          <div>
            <span>● 공공스팟</span>
            <span>● 사설스팟</span>
          </div>
        </UpperLine>
        <SpotsMap sportsKind={sportsKind} />
        {/* </MainMapLayout> */}
        <TapBar />
      </Layout>
    </>
  );
};

export default MainMaps;
