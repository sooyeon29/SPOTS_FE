import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotList from "./HostSpotList";
import { StWrap, MapPlace, PlaceList } from "./Style";
import SpotsMap from "../reservation/SpotsMap";
import {
  __getPrivateSpot,
  __getPublicSpot,
} from "../../redux/modules/spotsSlice";

const Reservation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state;
  const [searchedSpots, setSearchedSpots] = useState([]);
  localStorage.setItem("keyword", JSON.stringify(keyword));

  console.log("---------키워드-----------", keyword);

  // if (keyword === null) {
  //   console.log("키워드 없음");
  // }

  const { isLoading, error, privateSpot, publicSpot } = useSelector(
    (state) => state?.spots
  );
  const placeList = useSelector((state) => state.spots.privateSpot);
  console.log("---------사설시설-----------", placeList);

  const allSpots = [...(privateSpot || []), ...(publicSpot || [])];
  console.log("---------전체시설-----------", allSpots);

  console.log("---------검색결과-----------", searchedSpots);

  useEffect(() => {
    dispatch(__getPrivateSpot());
    dispatch(__getPublicSpot());

    if (keyword === null) {
      setSearchedSpots(allSpots);
    } else {
      setSearchedSpots(
        allSpots?.filter((spot) => spot?.spotName?.includes(keyword))
      );
    }
  }, [keyword]);

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
        <StWrap>
          <MapPlace>
            <SpotsMap placeList={placeList} />
          </MapPlace>
          <PlaceList>
            {searchedSpots.map((searchedSpot, index) => {
              return <SpotList key={index} searchedSpot={searchedSpot} />;
            })}
          </PlaceList>
        </StWrap>
      </Layout>
    </>
  );
};

export default Reservation;
