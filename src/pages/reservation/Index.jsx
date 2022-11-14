import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import useToggle from '../../hooks/useToggle';

import SpotList from './HostSpotList';
import { HostSpots, MapPlace, Place, PlaceList } from './Style';
import SpotsDetail from '../spotsDetail/Index';
import SpotsMap from '../reservation/SpotsMap';
import { __getPrivateSpot } from '../../redux/modules/spotsSlice';

const Reservation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state;
  console.log(keyword);

  useEffect(() => {
    dispatch(__getPrivateSpot());
  }, []);

  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );
  const placeList = useSelector((state) => state.spots.privateSpot);
  console.log('---------사설시설-----------', placeList);

  const allSpots = [...(privateSpot || []), ...(publicSpot || [])];
  console.log('---------전체시설-----------', allSpots);

  const searchedSpots = allSpots.filter((spot) => spot.spotName.includes(keyword));
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
        <HostSpots>
          <MapPlace>
            <SpotsMap placeList={placeList} />
          </MapPlace>
          <PlaceList>
            {searchedSpots?.map((searchedSpot, index) => {
              return <SpotList key={index} searchedSpot={searchedSpot} />;
            })}
          </PlaceList>
        </HostSpots>
      </Layout>
    </>
  );
};

export default Reservation;
