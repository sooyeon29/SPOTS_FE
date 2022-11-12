import React, { useEffect, useState } from 'react';
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { __getPrivateSpot } from '../../redux/modules/spotsSlice';
import { __getPublicSpot } from '../../redux/modules/spotsSlice';
import { Container } from './Styles';

const SpotsMap = () => {
  const getPrivSpot = useDispatch();
  const getPubSpot = useDispatch();

  useEffect(() => {
    getPrivSpot(__getPrivateSpot());
    getPubSpot(__getPublicSpot());
  }, []);

  const [isPrivateOpen, setIsPrivateOpen] = useState([]);
  const [isPublicOpen, setIsPublicOpen] = useState([]);

  const [level, setLevel] = useState();

  const handlePrivateOnClick = (e, idx) => {
    setIsPrivateOpen(idx);
  };

  const handlePublicOnClick = (e, idx) => {
    setIsPublicOpen(idx);
  };

  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state.spots
  );

  console.log('---------프라이빗스팟-----------', privateSpot);
  console.log('---------퍼블릭스팟-----------', publicSpot);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 37.5666805,
          lng: 126.9784147,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
        }}
        level={9} // 지도의 확대 레벨
        onZoomChanged={(map) => setLevel(map.getLevel())}>
        <ZoomControl />

        {privateSpot.map((place, idx) => (
          <>
            <MapMarker
              key={place.placesId}
              position={{
                lat: place.y,
                lng: place.x,
              }}
              onClick={(e) => handlePrivateOnClick(e, idx)}
              image={{
                src: '/public.png', // 마커이미지의 주소입니다
                size: {
                  width: 30,
                  height: 30,
                }, // 마커이미지의 크기입니다
                // options: {
                //   offset: {
                //     x: 27,
                //     y: 69,
                //   }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                // },
              }}
            />

            {isPrivateOpen === idx ? (
              <CustomOverlayMap
                key={place.idx}
                position={{
                  lat: place.y,
                  lng: place.x,
                }}>
                <Container>
                  {place.spotName}
                  <div onClick={() => setIsPrivateOpen(false)}>X</div>
                </Container>
              </CustomOverlayMap>
            ) : null}
          </>
        ))}

        {publicSpot.map((place, idx) => (
          <>
            <MapMarker
              key={place.opensId}
              position={{
                lat: place.y,
                lng: place.x,
              }}
              onClick={(e) => handlePublicOnClick(e, idx)}
              image={{
                src: '/private.png', // 마커이미지의 주소입니다
                size: {
                  width: 30,
                  height: 30,
                },
              }}
            />
            {isPublicOpen === idx ? (
              <CustomOverlayMap
                key={place.idx}
                position={{
                  lat: place.y,
                  lng: place.x,
                }}>
                <Container>
                  {place.placenm}
                  <div onClick={() => setIsPublicOpen(false)}>X</div>
                </Container>
              </CustomOverlayMap>
            ) : null}
          </>
        ))}
      </Map>
    </>
  );
};

export default SpotsMap;
