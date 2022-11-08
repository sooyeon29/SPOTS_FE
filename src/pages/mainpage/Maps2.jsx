import React, { useEffect } from 'react';

const { kakao } = window;

const Maps2 = () => {
  const mockData = [
    {
      place: '아디다스 더베이스 서울',
      address: '서울 용산구 한강대로23길 55 현대아이파크몰 리빙파크',
    },
    {
      place: '스트리트풋살파크',
      address: '서울 강서구 화곡로 142 메가스퀘어빌딩',
    },
    {
      place: '파시온FC',
      address: '서울 중구 다산로22길 14 (신당동) 지하 1층 중구파시온 축구클럽',
    },
  ];

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다.
    for (let i = 0; i < mockData.length; i++) {
      geocoder.addressSearch(mockData[i].address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          let iwContent =
            '<div style="padding:5px;"><br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>' +
            '<div class="wrap">' +
            `<div class="title"> ${mockData[i].place}` +
            '<div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            '</div>' +
            '</div>' +
            '</div>';

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          let overlay = new kakao.maps.CustomOverlay({
            content: iwContent,
            map: map,
            position: marker.getPosition()
          });
          
          // let infowindow = new kakao.maps.InfoWindow({
          //   content: iwContent,
          // });

            // '<div style="width:150px;color:red;text-align:center;padding:6px 0;">풋살장</div>',
          // infowindow.open(map, marker);

          // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);

          // // 마커에 마우스오버 이벤트를 등록합니다
          // kakao.maps.event.addListener(marker, 'mouseover', function () {
          //   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          //   infowindow.open(map, marker);
          // });

          // kakao.maps.event.addListener(marker, 'click', function () {
          //   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          //   infowindow.open(map, marker);
          // });

          // // 마커에 마우스아웃 이벤트를 등록합니다
          // kakao.maps.event.addListener(marker, 'mouseout', function () {
          //   // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          //   infowindow.close();
          // });
        }
      });
    }
  };

  return (
    <div
      id='myMap'
      style={{
        width: '800px',
        height: '800px',
      }}></div>
  );
};

export default Maps2;
