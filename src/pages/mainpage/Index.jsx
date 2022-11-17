import { useState } from "react";
import styled from "styled-components";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MainMapLayout from "../../components/MainMapLayout";
import SpotsMap from "./SpotsMap";
import { UpperLine, BtnWrap } from "./Styles";
import TapBar from "../../components/TapBar";

const MainMaps = () => {
  const [sportsKind, setSportsKind] = useState("");
  const futsal = "풋살장";
  const tennis = "테니스장";
  const badminton = "배드민턴장";

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
            <span>●공공스팟</span>
            <span>●사설스팟</span>
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
