import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotList from "./HostSpotList";
import { FaSearchLocation } from "react-icons/fa";
import {
  StWrap,
  MapPlace,
  PlaceList,
  StSearch,
  SearchInput,
  ListBar,
  Lists,
} from "./Styles";
import SpotsMap from "../reservation/SpotsMap";
import {
  __getAllSpot,
  __getSearchedSpot,
} from "../../redux/modules/spotsSlice";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";
import Loading from "../../components/Loading";

const Reservation = () => {
  const [keywords, setKeywords] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, error, searchedSpot, allSpot } = useSelector(
    (state) => state?.spots
  );
  const title = "검색";

  useEffect(() => {
    if (!params.keywords) {
      dispatch(__getAllSpot());
    } else {
      dispatch(__getSearchedSpot(params.keywords));
    }
  }, []);

  const onSearchHandler = async (e) => {
    e.preventDefault();
    window.location.href = "/book/" + keywords;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (params?.keywords?.includes(" ")) {
    params.keyword = params?.keywords?.split(" ");
  }

  return (
    <>
      <Layout>
        <FlexibleHeader title={title} />
        <StWrap>
          <StSearch>
            <FaSearchLocation style={{ paddingLeft: "20px" }} />
            <form onSubmit={onSearchHandler}>
              <SearchInput
                type="text"
                // value={keywords}
                defaultValue={keywords}
                placeholder="지역, 스팟 이름으로 찾기"
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
            </form>
          </StSearch>
          <MapPlace>
            {!params.keywords ? (
              <>
                {/* {console.log("-----No Params-----", allSpot)} */}
                <SpotsMap spotMarkers={allSpot} />
              </>
            ) : (
              <>
                {/* {console.log("-----Yes Params-----", searchedSpot)} */}
                <SpotsMap spotMarkers={searchedSpot} />
              </>
            )}
          </MapPlace>
          <PlaceList>
            <ListBar />
            <Lists>
              {!params.keywords ? (
                <>
                  <SpotList spotList={allSpot} />
                </>
              ) : (
                <>
                  <SpotList spotList={searchedSpot} />
                </>
              )}
            </Lists>
          </PlaceList>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default Reservation;
