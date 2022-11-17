import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotList from "./HostSpotList";
import { StWrap, MapPlace, PlaceList, Index } from "./Style";
import SpotsMap from "../reservation/SpotsMap";
import {
  __getPrivateSpot,
  __getPublicSpot,
} from "../../redux/modules/spotsSlice";
import { SearchApi } from "../../tools/instance";
import TapBar from "../../components/TapBar";

const Reservation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [searchedSpots, setsearchedSpots] = useState();
  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );

  const allSpots = [...(privateSpot || []), ...(publicSpot || [])];
  console.log("---------전체시설-----------", allSpots);

  useEffect(() => {
    if (!params.keywords) {
      return;
    }
    async function fetchData() {
      const searched = await SearchApi.getSearchedSpot(params.keywords);
      setsearchedSpots([
        ...searched.data.data.private,
        ...searched.data.data.public,
      ]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(__getPrivateSpot());
    dispatch(__getPublicSpot());
  }, []);

  const placeList = useSelector((state) => state.spots.privateSpot);
  // console.log('---------지도로들어감-----------', placeList);
  // console.log('---------검색결과-----------', searchedSpots);

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
        {!params.keywords ? (
          <h1>당신만의 스팟을 찾아보세요!</h1>
        ) : (
          <>
            <h1>'{params.keywords}' 스팟 검색 결과</h1>
          </>
        )}
        <StWrap>
          <MapPlace>
            <SpotsMap placeList={placeList} />
          </MapPlace>
          <Index>
            <img alt="공공스팟" src="/public.png" />
            <div>공공시설</div>
            <img alt="사설스팟" src="/private.png" />
            <div>사설시설</div>
          </Index>
          <PlaceList>
            {!params.keywords &&
              allSpots?.map((searchedSpot, index) => {
                return <SpotList key={index} searchedSpot={searchedSpot} />;
              })}
            {searchedSpots?.map((searchedSpot, index) => {
              return <SpotList key={index} searchedSpot={searchedSpot} />;
            })}
          </PlaceList>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default Reservation;
