import { useState } from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import MainMapLayout from '../../components/MainMapLayout';
import SpotsMap from './SpotsMap';
import { UpperLine } from './Styles';

// import { SportMaps } from "./Styles";

const MainMaps = () => {
  const [sportsKind, setSportsKind] = useState('');
  const futsal = '풋살장';
  const tennis = '테니스장';
  const badminton = '배드민턴장';

  return (
    <>
      <Layout>
        <Header />
        <Banner />
        {/* <MainMapLayout> */}
        <UpperLine>
          <div>
            <button onClick={() => setSportsKind(futsal)}>풋살</button>
            <button onClick={() => setSportsKind(tennis)}>테니스</button>
            <button onClick={() => setSportsKind(badminton)}>배드민턴</button>
          </div>
          <div>
            <span>● 공공스팟</span>
            <span>● 사설스팟</span>
          </div>
        </UpperLine>
        <SpotsMap sportsKind={sportsKind} />
        {/* </MainMapLayout> */}
      </Layout>
    </>
  );
};

export default MainMaps;
