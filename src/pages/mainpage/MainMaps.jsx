import { useEffect, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
// import { SportMaps } from "./Styles";

const MainMaps = () => {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

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
        {/* <SportMaps> */}
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 37.52998796554753,
            lng: 126.96448696139878,
          }}
          style={{
            // 지도의 크기
            width: "90%",
            height: "450px",
          }}
          level={8} // 지도의 확대 레벨
          ref={mapRef}
        >
          <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
            position={{
              // 인포윈도우가 표시될 위치입니다
              lat: 37.52998796554753,
              lng: 126.96448696139878,
            }}
          >
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
            <div style={{ padding: "5px", color: "#000" }}>
              아디다스 더베이스 서울 <br />
              <a
                // 상세페이지를 만든후 아래 href에 알맞는 경로를 넣어주기
                href="https://map.kakao.com/link/map/Hello World!,37.52998796554753,126.96448696139878"
                style={{ color: "blue" }}
                target="_blank"
                rel="noreferrer"
              >
                상세보기
              </a>
            </div>
          </MapMarker>
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={10} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            // 마커 클러스터러에 클릭이벤트를 등록합니다
            // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
            // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
            onClusterclick={onClusterclick}
          >
            {positions.map((pos) => (
              <MapMarker
                key={`${pos.lat}-${pos.lng}`}
                position={{
                  lat: pos.lat,
                  lng: pos.lng,
                }}
              />
            ))}
          </MarkerClusterer>
        </Map>
        {/* </SportMaps> */}
        <button onClick={() => navigate(`/spotsdetail`)}>상세페이지로</button>
      </Layout>
    </>
  );
};

export default MainMaps;
