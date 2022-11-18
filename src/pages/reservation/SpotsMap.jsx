import React, { useState } from "react";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { BtnWrap } from "./Style";

const SpotsMap = ({ spotMarkers }) => {
  const [isPrivateOpen, setIsPrivateOpen] = useState([]);
  const [isPublicOpen, setIsPublicOpen] = useState([]);
  const [level, setLevel] = useState();
  const [filter, setFilter] = useState(false);

  // console.log('----검색결과----', spotMarkers);
  const privateSpots = spotMarkers?.private;
  const publicSpots = spotMarkers?.public;
  // console.log('----사설----', privateSpots);
  // console.log('----공공----', publicSpots);

  // const handleOnClick = (e, idx) => {
  //   setIsOpen(idx);
  // };

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
  console.log(filter);

  return (
    <>
      <BtnWrap>
        <button onClick={() => handleOnFilter("풋살장")}>풋살</button>
        <button onClick={() => handleOnFilter("테니스장")}>테니스</button>
        <button onClick={() => handleOnFilter("배드민턴장")}>배드민턴</button>
      </BtnWrap>
      <Map
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 37.5666805,
          lng: 126.9784147,
        }}
        style={{
          //지도의 크기
          width: "100%",
          height: "40vh",
        }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />

        {privateSpots?.map((privSpot, idx) => {
          if (filter === false) {
            return (
              <>
                <MapMarker
                  key={privSpot.placesId}
                  position={{
                    lat: privSpot.y,
                    lng: privSpot.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src: "/private.png", // 마커이미지의 주소입니다
                    size: {
                      width: 30,
                      height: 30,
                    },
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
                    <div onClick={() => setIsPrivateOpen(false)}>
                      <div>{privSpot.spotName}</div>
                    </div>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          } else if (filter === privSpot.sports) {
            return (
              <>
                <MapMarker
                  key={privSpot.placesId}
                  position={{
                    lat: privSpot.y,
                    lng: privSpot.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src:
                      (privSpot.sports === "풋살장" && "/privateFutsal.png") ||
                      (privSpot.sports === "배드민턴장" &&
                        "/privateBadminton.png") ||
                      (privSpot.sports === "테니스장" && "/privateTennis.png"),
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
                />

                {isPrivateOpen === idx ? (
                  <CustomOverlayMap
                    key={privSpot.idx}
                    position={{
                      lat: privSpot.y,
                      lng: privSpot.x,
                    }}
                  >
                    <div onClick={() => setIsPrivateOpen(false)}>
                      <div>{privSpot.spotName}</div>
                    </div>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          }
        })}

        {publicSpots?.map((pubSpot, idx) => {
          if (filter === false) {
            return (
              <>
                <MapMarker
                  key={pubSpot.opensId}
                  position={{
                    lat: pubSpot.y,
                    lng: pubSpot.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src: "/public.png", // 마커이미지의 주소입니다
                    size: {
                      width: 30,
                      height: 30,
                    },
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
                    <div onClick={() => setIsPublicOpen(false)}>
                      <title>{pubSpot.placenm}</title>
                    </div>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          } else if (filter === pubSpot.minclassnm) {
            return (
              <>
                <MapMarker
                  key={pubSpot.opensId}
                  position={{
                    lat: pubSpot.y,
                    lng: pubSpot.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src:
                      (pubSpot.minclassnm === "풋살장" &&
                        "/publicFutsal.png") || // 마커이미지의 주소입니다
                      (pubSpot.minclassnm === "배드민턴장" &&
                        "/publicBadminton.png") ||
                      (pubSpot.minclassnm === "테니스장" &&
                        "/publicTennis.png"),
                    size: {
                      width: 30,
                      height: 30,
                    },
                  }}
                />
                {isPublicOpen === idx ? (
                  <CustomOverlayMap
                    key={pubSpot.idx}
                    position={{
                      lat: pubSpot.y,
                      lng: pubSpot.x,
                    }}
                  >
                    <div onClick={() => setIsPublicOpen(false)}>
                      <div>{pubSpot.placenm}</div>
                    </div>
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
