import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import FutsalMap from './FutsalMap';
import SpotsMap from './SpotsMap';
import { SpotsBtns } from './Styles';

// import { SportMaps } from "./Styles";

const MainMaps = () => {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sports, setSports] = useState('');
  const [futsalView, setFutsalView] = useState(false);

  const onSportsHandler = (e) => {
    setSports(e.target.value);
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/book', { state: [sports, keyword] });
    console.log({ state: [sports, keyword] });
  };
  // console.log(keyword)

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
        <img alt='' src='fortest.jpg' width={100} />
        <SpotsBtns>
          <button onClick={() => setFutsalView(!futsalView)}>풋살장</button>
          <button>테니스장</button>
          <button>배드민턴장</button>
        </SpotsBtns>
        {futsalView ? <FutsalMap /> : <SpotsMap />}
        <select onChange={onSportsHandler}>
          <option>전체</option>
          <option>풋살장</option>
          <option>테니스장</option>
          <option>배드민턴장</option>
        </select>
        <form onSubmit={onSearchHandler}>
          <input
            type='text'
            value={keyword}
            placeholder='구를 입력하세요 예) 마포구'
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <button>스팟 검색</button>
        </form>
      </Layout>
    </>
  );
};

export default MainMaps;
