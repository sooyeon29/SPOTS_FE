import React, { useState } from "react";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import styled from "styled-components";

const SpotsMap = ({ placeList }) => {
  const [isOpen, setIsOpen] = useState([]);
  const [level, setLevel] = useState();
  const [filter, setFilter] = useState(false);

  const handleOnClick = (e, idx) => {
    setIsOpen(idx);
  };

  const handleOnFilter = (sports) => {
    setFilter(sports);
  };

  return (
    <>
      <button onClick={() => handleOnFilter("풋살장")}>풋살장</button>
      <button onClick={() => handleOnFilter("테니스장")}>테니스장</button>
      <button onClick={() => handleOnFilter("배드민턴장")}>배드민턴장</button>
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 37.5666805,
          lng: 126.9784147,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={8} // 지도의 확대 레벨
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />

        {placeList.map((place, idx) => {
          if (filter === false) {
            return (
              <>
                <MapMarker
                  key={place.placesId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => {
                    handleOnClick(e, idx);
                  }}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
                    size: {
                      width: 64,
                      height: 69,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 27,
                        y: 69,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
                {isOpen === idx ? (
                  <CustomOverlayMap
                    position={{
                      lat: place.y,
                      lng: place.x,
                    }}
                  >
                    <Container>
                      {place.spotName}
                      <div onClick={() => setIsOpen(false)}>X</div>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          }
          if (filter === place.sports) {
            return (
              <>
                <MapMarker
                  key={place.placesId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => {
                    handleOnClick(e, idx);
                  }}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
                    size: {
                      width: 64,
                      height: 69,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 27,
                        y: 69,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
                {isOpen === idx ? (
                  <CustomOverlayMap
                    position={{
                      lat: place.y,
                      lng: place.x,
                    }}
                  >
                    <Container>
                      {place.spotName}
                      <div onClick={() => setIsOpen(false)}>X</div>
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          }
        })}
      </Map>
    </>
  );
};

export default SpotsMap;

const Container = styled.div`
  width: 100px;
  height: 50px;
  background-color: white;
`;
