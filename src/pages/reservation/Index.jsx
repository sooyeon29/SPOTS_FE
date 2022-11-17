import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SpotList from './HostSpotList';
import { StWrap, MapPlace, PlaceList, Status } from './Style';
import SpotsMap from '../reservation/SpotsMap';
import {
  __getPrivateSpot,
  __getPublicSpot,
} from '../../redux/modules/spotsSlice';
import axios from 'axios';
import { SearchApi } from '../../tools/instance';

const Reservation = ({keyword}) => {
  const dispatch = useDispatch();
  const params = useParams(false);
  const [searchedSpots, setsearchedSpots] = useState();
  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );
  const searchTerm = params.keyword
  console.log('키워드', searchTerm)
  console.log('파람', params)

  const allSpots = [...(privateSpot || []), ...(publicSpot || [])];
  console.log("---------전체시설-----------", allSpots);

  useEffect(() => {
    async function fetchData() {
      const searched = await SearchApi.getSearchedSpot(params.keyword);
      setsearchedSpots(searched.data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(__getPrivateSpot());
    dispatch(__getPublicSpot());
    setsearchedSpots(allSpots)
  }, []);

  const placeList = useSelector((state) => state.spots.privateSpot);
  console.log('---------지도로들어감-----------', placeList);
  console.log('---------검색결과-----------', searchedSpots);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  return (
    <>
      <Layout>
        <Header />
        <h1>{params.keyword} 검색 결과</h1>
        <StWrap>
          <MapPlace>
            {/* <SpotsMap placeList={placeList} /> */}
          </MapPlace>
          <PlaceList>
            {searchedSpots?.map((searchedSpot, index) => {
              return <SpotList key={index} searchedSpot={searchedSpot} />;
            })}
          </PlaceList>
        </StWrap>
      </Layout>
    </>
  );
};

export default Reservation;
