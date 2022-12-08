import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnWrap, Container } from "./Style";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const SpotsMap = ({ spotMarkers }) => {
  const navigate = useNavigate();
  const [isPrivateOpen, setIsPrivateOpen] = useState([]);
  const [isPublicOpen, setIsPublicOpen] = useState([]);
  const [level, setLevel] = useState();
  const [filter, setFilter] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 37.5466805,
      lng: 126.9784147,
    },
    errMsg: null,
    isLoading: true,
  });

  const privateSpots = spotMarkers?.private;
  const publicSpots = spotMarkers?.public;

  const handlePrivateOnClick = (e, idx) => {
    setIsPrivateOpen(idx);
    setIsPublicOpen(false);
  };

  const handlePublicOnClick = (e, idx) => {
    setIsPublicOpen(idx);
    setIsPrivateOpen(false);
  };

  const handleOnFilter = (sports) => {
    setFilter(sports);
  };

  return (
    <>
      <BtnWrap>
        <button onClick={() => handleOnFilter("풋살장")}>풋살</button>
        <button onClick={() => handleOnFilter("테니스장")}>테니스</button>
        <button onClick={() => handleOnFilter("배드민턴장")}>배드민턴</button>
      </BtnWrap>
      <Map
        id={`map`}
        center={state.center}
        style={{
          //지도의 크기
          width: "100%",
          height: "40vh",
        }}
        level={9} // 지도의 확대 레벨
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />

        {privateSpots?.map((privSpot, idx) => {
          if (filter === false) {
            return (
              <div key={privSpot.placesId}>
                <MapMarker
                  // key={privSpot.placesId}
                  position={{
                    lat: privSpot.y,
                    lng: privSpot.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src: "/private.png", // 마커이미지의 주소입니다
                    size:
                      (level >= 8 && { width: 30, height: 30 }) ||
                      (level >= 6 && { width: 35, height: 35 }) ||
                      (level >= 4 && { width: 40, height: 40 }),
                  }} // 마커이미지의 크기입니다
                />
                {isPrivateOpen === idx ? (
                  <CustomOverlayMap
                    key={privSpot.idx}
                    position={{
                      lat: privSpot.y,
                      lng: privSpot.x,
                    }}
                  >
                    <Container onClick={() => setIsPrivateOpen(false)}>
                      <div>{privSpot.spotName}</div>
                      <div
                        onClick={() =>
                          navigate(`/spotsdetail/${privSpot.placesId}`)
                        }
                      >
                        구장 보기
                      </div>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </div>
            );
          } else if (filter === privSpot.sports) {
            return (
              <div key={privSpot.placesId}>
                <MapMarker
                  position={{
                    lat: privSpot.y,
                    lng: privSpot.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src: "/private.png", // 마커이미지의 주소입니다
                    size:
                      (level >= 8 && { width: 30, height: 30 }) ||
                      (level >= 6 && { width: 35, height: 35 }) ||
                      (level >= 4 && { width: 40, height: 40 }),
                  }} // 마커이미지의 크기입니다
                />

                {isPrivateOpen === idx ? (
                  <CustomOverlayMap
                    key={privSpot.idx}
                    position={{
                      lat: privSpot.y,
                      lng: privSpot.x,
                    }}
                  >
                    <Container onClick={() => setIsPrivateOpen(false)}>
                      <div>{privSpot.spotName}</div>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </div>
            );
          }
        })}

        {publicSpots?.map((pubSpot, idx) => {
          if (filter === false) {
            return (
              <div key={pubSpot.opensId}>
                <MapMarker
                  // key={pubSpot.opensId}
                  position={{
                    lat: pubSpot.y,
                    lng: pubSpot.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src: "/public.png", // 마커이미지의 주소입니다
                    size:
                      (level >= 8 && { width: 30, height: 30 }) ||
                      (level >= 6 && { width: 35, height: 35 }) ||
                      (level >= 4 && { width: 40, height: 40 }),
                  }} // 마커이미지의 크기입니다
                />
                {isPublicOpen === idx ? (
                  <CustomOverlayMap
                    key={pubSpot.idx}
                    position={{
                      lat: pubSpot.y,
                      lng: pubSpot.x,
                    }}
                  >
                    <Container onClick={() => setIsPublicOpen(false)}>
                      <div>{pubSpot.placenm}</div>
                      <a href={pubSpot.svcurl} target="_blank">
                        예약하러 가기{" "}
                      </a>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </div>
            );
          } else if (filter === pubSpot.minclassnm) {
            return (
              <div key={pubSpot.opensId}>
                <MapMarker
                  // key={pubSpot.opensId}
                  position={{
                    lat: pubSpot.y,
                    lng: pubSpot.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src: "/public.png", // 마커이미지의 주소입니다
                    size:
                      (level >= 8 && { width: 30, height: 30 }) ||
                      (level >= 6 && { width: 35, height: 35 }) ||
                      (level >= 4 && { width: 40, height: 40 }),
                  }} // 마커이미지의 크기입니다
                />
                {isPublicOpen === idx ? (
                  <CustomOverlayMap
                    key={pubSpot.idx}
                    position={{
                      lat: pubSpot.y,
                      lng: pubSpot.x,
                    }}
                  >
                    <Container onClick={() => setIsPublicOpen(false)}>
                      <div>{pubSpot.placenm}</div>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </div>
            );
          }
        })}
      </Map>
    </>
  );
};

export default SpotsMap;
