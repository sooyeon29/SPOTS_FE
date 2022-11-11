import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import SpotList from "./HostSpotList";
import { HostSpots, MapPlace, PlaceList } from "./Style";
import SpotsMap from "./SpotsMap";

const Reservation = () => {
  const [search, setSearch] = useState();
  const location = useLocation();
  const keyword = location.state;
  // console.log(keyword[0]);
  // console.log(keyword[1]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPrivateSpot());
  }, []);

  const { isLoading, error } = useSelector((state) => state?.privateSpot);
  const placeList = useSelector((state) => state.privateSpot.privateSpot);
  console.log("플레이스리스트에들은거", placeList);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const onChangeSearch = (e) => {
    e.preventDeafualt();
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDeafualt();
  };

  return (
    <>
      <Layout>
        <Header />
        <div>
          <form onSubmit={(e) => onSearch(e)}>
            <input
              type="type"
              value={search}
              placeholder="구를 입력하세요 예) 마포구"
              onChange={onChangeSearch}
            />
            <button type="submit">스팟 찾기</button>
            <div>
              {/* {keyword[1]}  */}
              검색 결과
            </div>
          </form>
        </div>{" "}
        <HostSpots>
          <MapPlace>
            <SpotsMap placeList={placeList} />
          </MapPlace>
          <PlaceList>
            {placeList?.map((place) => {
              return <SpotList key={place.placesId} place={place} />;
            })}
          </PlaceList>
        </HostSpots>
      </Layout>
    </>
  );
};

export default Reservation;
