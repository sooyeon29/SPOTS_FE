import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotList from "./HostSpotList";
import { StWrap, MapPlace, PlaceList, Index } from "./Style";
import SpotsMap from "../reservation/SpotsMap";
import {
  __getAllSpot,
  __getSearchedSpot,
} from "../../redux/modules/spotsSlice";
import TapBar from "../../components/TapBar";

const Reservation = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, error, searchedSpot, allSpot } = useSelector(
    (state) => state?.spots
  );

  useEffect(() => {
    if (!params.keywords) {
      dispatch(__getAllSpot());
      console.log("No Params");
    } else {
      dispatch(__getSearchedSpot(params.keywords));
      console.log("Yes Params");
    }
  }, []);

  console.log("---검색---", searchedSpot);
  console.log("---전체---", allSpot);

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
            {!params.keywords ? (
              <>
                {console.log("-----No Params-----", allSpot)}
                <SpotsMap spotMarkers={allSpot} />
              </>
            ) : (
              <>
                {console.log("-----Yes Params-----", searchedSpot)}
                <SpotsMap spotMarkers={searchedSpot} />
              </>
            )}
          </MapPlace>
          <Index>
            <img alt="공공스팟" src="/public.png" />
            <div>공공시설</div>
            <img alt="사설스팟" src="/private.png" />
            <div>사설시설</div>
          </Index>
          <PlaceList>
            {!params.keywords ? (
              <>
                <SpotList spotList={allSpot} />
              </>
            ) : (
              <>
                <SpotList spotList={searchedSpot} />
              </>
            )}
          </PlaceList>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default Reservation;
