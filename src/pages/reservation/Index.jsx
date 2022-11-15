import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import useToggle from '../../hooks/useToggle';

import SpotList from './HostSpotList';
import { HostSpots, MapPlace, ListBox, PlaceList, Status } from './Style';
import SpotsDetail from '../spotsDetail/Index';
import SpotsMap from '../reservation/SpotsMap';
import { __getPrivateSpot } from '../../redux/modules/spotsSlice';

const Reservation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state;
  const [searchedSpots, setSearchedSpots] = useState([]);

  console.log('---------키워드-----------', keyword);

  if (keyword === null) {
    console.log('키워드 없음');
  }

  useEffect(() => {
    dispatch(__getPrivateSpot());
    if (keyword === null) {
      setSearchedSpots(allSpots);
    } else {
      setSearchedSpots(
        allSpots.filter((spot) => spot.spotName.includes(keyword))
      );
    }
  }, []);

  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );
  const placeList = useSelector((state) => state.spots.privateSpot);
  console.log("---------사설시설-----------", placeList);

  const allSpots = [...(privateSpot || []), ...(publicSpot || [])];
  console.log("---------전체시설-----------", allSpots);
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
          <ListBox>
          <Status>
            <span>예약 마감</span>
            <span>매칭 가능</span>
          </Status>
          <PlaceList>
            {searchedSpots?.map((searchedSpot, index) => {
              return <SpotList key={index} searchedSpot={searchedSpot} />;
            })}
          </PlaceList>
          </ListBox>
        </HostSpots>
      </Layout>
    </>
  );
};

export default Reservation;
