import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotsMap from "./SpotsMap";
import { SpotsBtns } from "./Styles";

// import { SportMaps } from "./Styles";

const MainMaps = () => {
  const mapRef = useRef();
  const [sportsKind, setSportsKind] = useState("");
  const futsal = "풋살장";
  const tennis = "테니스장";
  const badminton = "배드민턴장";

  useEffect(() => {
    // 백에서 저장해준데이터를 가져와서 setPositions에 넣어주어야 한다.
    // ex( https://apis.map.kakao.com/download/web/data/chicken.json )
    // setPositions(clusterPositionsData.positions);
  }, []);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <>
      <Layout>
        <Header />
        <Banner />
        <SpotsBtns>
          <button onClick={() => setSportsKind(futsal)}>풋살</button>
          <button onClick={() => setSportsKind(tennis)}>테니스</button>
          <button onClick={() => setSportsKind(badminton)}>배드민턴</button>
        </SpotsBtns>
        <SpotsMap sportsKind={sportsKind} />
      </Layout>
    </>
  );
};

export default MainMaps;
