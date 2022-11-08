import { useEffect, useState } from "react";
import { placesInfo } from "../../tools/dummy";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;
const ReactMap = () => {
  //   const [positions, setPositions] = useState([]);
  const [state, setState] = useState({
    center: { lat: 35.12, lng: 129.1 },
    isPanto: true,
  });
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newAddress = result[0];
        // console.log(newAddress);
        setState({
          center: { lat: newAddress.y, lng: newAddress.x },
        });
      }
    };
    const position = placesInfo.map((placeInfo) => {
      return geocoder.addressSearch(placeInfo.place, callback);
    });
    console.log(position);
  }, []);

  console.log(state);

  return (
    <>
      <div>안녕</div>
      {/* position?.map((pos) => ()) */}
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        <MapMarker position={state.center}>
          <div style={{ padding: "10px", background: "#84EAC3" }}>
            풋살장⚽
            <br />
            <a
              // 상세페이지를 만든후 아래 href에 알맞는 경로를 넣어주기
              href="https://map.kakao.com/link/map/Hello World!,{state.center}"
              style={{ color: "blue" }}
              target="_blank"
              rel="noreferrer"
            >
              상세보기
            </a>
          </div>
        </MapMarker>
      </Map>
    </>
  );
};

export default ReactMap;
