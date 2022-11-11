import React, { useState } from "react";
import {
  Map,
  ZoomControl,
  MapMarker,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

const SpotsMap = ({ placeList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState();

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

        {placeList.map((place, index) => (
          <MapMarker
            key={place.placesId}
            position={{
              lat: place.y,
              lng: place.x,
            }}
            onClick={() => setIsOpen(true)}
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
        ))}

        {isOpen && (
          <CustomOverlayMap
          //   position={markerPosition}
          >
            <div
              style={{
                padding: "2px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            >
              <div className="info">
                <div className="title">
                  카카오 스페이스닷원
                  <div
                    className="close"
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  >
                    닫기
                  </div>
                </div>
                <div className="body">
                  <div className="img">
                    <img
                      src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                      width="73"
                      height="70"
                      alt="카카오 스페이스닷원"
                    />
                  </div>
                  <div className="desc">
                    <div className="ellipsis">
                      제주특별자치도 제주시 첨단로 242
                    </div>
                    <div className="jibun ellipsis">
                      (우) 63309 (지번) 영평동 2181
                    </div>
                    <div>
                      <a
                        href="https://www.kakaocorp.com/main"
                        target="_blank"
                        className="link"
                        rel="noreferrer"
                      >
                        홈페이지
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default SpotsMap;
