import React, { useEffect, useState } from "react";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import { Container } from "./Styles";

const SpotsMap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPrivateSpot());
  }, []);

  const [isOpen, setIsOpen] = useState([]);
  const [level, setLevel] = useState();

  const handleOnClick = (e, idx) => {
    setIsOpen(idx);
  };

  const { isLoading, error, privateSpot } = useSelector(
    (state) => state?.privateSpot
  );
  console.log("---------프라이빗스팟-----------", privateSpot);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {/* <RemovableCustomOverlayStyle /> */}
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

        {privateSpot.map((place, idx) => (
          <>
            <MapMarker
              key={place.placesId}
              position={{
                lat: place.y,
                lng: place.x,
              }}
              onClick={(e) => handleOnClick(e, idx)}
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
            {isOpen && (
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
            )}
          </>
        ))}
      </Map>
    </>
  );
};

export default SpotsMap;
