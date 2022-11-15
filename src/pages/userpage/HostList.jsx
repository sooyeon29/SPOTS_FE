import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __deletePrivateSpot,
  __getMyPrivateSpot,
} from "../../redux/modules/spotsSlice";
import { StTag, StTeam, StWrap } from "./Styles";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const HostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, []);
  const placeList = useSelector((state) => state.spots.myPrivateSpot);
  // state.spots);
  console.log(placeList);

  const deleteHostHandler = (id) => {
    dispatch(__deletePrivateSpot(id));
  };

  return (
    <Layout>
      <Header />
      <StWrap>
        <StTag>HostList</StTag>
        <button onClick={() => navigate(`/hosting`)}>내구장 등록하기</button>
        <h5>내가 등록한 구장</h5>

        {placeList?.map((place) => {
          return (
            <StTeam key={place.placesId}>
              <h5>{place.spotName}</h5>
              {place.sports}
              <span>- {place.spotKind}</span>
              <br />
              {place.address}
              <br />
              <span>{place.price}원</span>

              <div>
                <button
                  onClick={() => {
                    navigate(`/hostdetail/${place.placesId}`);
                  }}
                >
                  수정하기
                </button>
                <button onClick={() => deleteHostHandler(place.placesId)}>
                  삭제하기
                </button>
              </div>
            </StTeam>
          );
        })}
      </StWrap>
    </Layout>
  );
};

export default HostList;
