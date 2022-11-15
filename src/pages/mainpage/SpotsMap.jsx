import React, { useEffect, useState } from "react";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { __getPrivateSpot } from '../../redux/modules/spotsSlice';
import { __getPublicSpot } from '../../redux/modules/spotsSlice';
import { Container, Title } from './Styles';


const SpotsMap = ({ sportsKind }) => {
  const getPrivSpot = useDispatch();
  const getPubSpot = useDispatch();

  // console.log(sportsKind);

  useEffect(() => {
    getPrivSpot(__getPrivateSpot());
    getPubSpot(__getPublicSpot());

  }, []);

  const [isPrivateOpen, setIsPrivateOpen] = useState([]);
  const [isPublicOpen, setIsPublicOpen] = useState([]);
  const [level, setLevel] = useState();

  const handlePrivateOnClick = (e, idx) => {
    setIsPrivateOpen(idx);
    setIsPublicOpen(false);
  };

  const handlePublicOnClick = (e, idx) => {
    setIsPublicOpen(idx);
    setIsPrivateOpen(false);
  };

  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );

  console.log("---------사설시설-----------", privateSpot);
  console.log("---------공공시설-----------", publicSpot);

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
          width: "80%",
          height: "500px",
        }}
        level={9} // 지도의 확대 레벨
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />

        {privateSpot.map((place, idx) => {
          if (sportsKind === "") {
            return (
              <>
                <MapMarker
                  key={place.placesId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src: '/private.png', // 마커이미지의 주소입니다
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
                    <Container onClick={() => setIsPrivateOpen(false)}>
                      <Title>{place.spotName}</Title>
                      {/* <div onClick={() => setIsPrivateOpen(false)}>닫기</div> */}
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          } else if (sportsKind === place.sports) {
            return (
              <>
                <MapMarker
                  key={place.placesId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => handlePrivateOnClick(e, idx)}
                  image={{
                    src: '/private.png', // 마커이미지의 주소입니다
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
                    <Container onClick={() => setIsPrivateOpen(false)}>
                      <Title>{place.spotName}</Title>
                      {/* <div onClick={() => setIsPrivateOpen(false)}>X</div> */}
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          }
        })}

        {publicSpot.map((place, idx) => {
          if (sportsKind === "") {
            return (
              <>
                <MapMarker
                  key={place.opensId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src: '/public.png', // 마커이미지의 주소입니다
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
                    <Container onClick={() => setIsPublicOpen(false)}>
                      <Title>{place.spotName}</Title>
                      {/* <div onClick={() => setIsPublicOpen(false)}>X</div> */}
                    </Container>
                  </CustomOverlayMap>
                ) : null}
              </>
            );
          } else if (sportsKind === place.minclassnm) {
            return (
              <>
                <MapMarker
                  key={place.opensId}
                  position={{
                    lat: place.y,
                    lng: place.x,
                  }}
                  onClick={(e) => handlePublicOnClick(e, idx)}
                  image={{
                    src: '/public.png', // 마커이미지의 주소입니다
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
                    <Container onClick={() => setIsPublicOpen(false)}>
                      <Title>{place.spotName}</Title>
                      {/* <div onClick={() => setIsPublicOpen(false)}>X</div> */}
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
