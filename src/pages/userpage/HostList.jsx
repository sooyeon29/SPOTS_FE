import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyPrivateSpot } from "../../redux/modules/spotsSlice";
import { StTag, StTeam, StWrap } from "./Styles";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const HostList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, []);
  const placeList = useSelector((state) => state.spots.myPrivateSpot);
  // state.spots);
  console.log(placeList);
  return (
    <Layout>
      <Header />
      <StWrap>
        <StTag>HostList</StTag>
        <h5>내가 등록한 구장</h5>
        {placeList?.map((place) => {
          return (
            <StTeam key={place.placesId}>
              {place.spotName}
              <br />
              {place.sports}
              <br />
              <span>{place.spotKind}</span>
              <span>{place.price}원</span>
            </StTeam>
          );
        })}
      </StWrap>
    </Layout>
  );
};

export default HostList;
