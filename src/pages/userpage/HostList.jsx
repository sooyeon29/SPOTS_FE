import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import { StTag, StTeam, StWrap } from "./Styles";

const HostList = ({ hostToggle, hostClickToggle }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPrivateSpot());
  }, []);
  const placeList = useSelector((state) => state.privateSpot.privateSpot);
  return (
    <>
      <StWrap>
        <StTag>HostList</StTag>
        <button hostToggle={hostToggle} onClick={hostClickToggle}>
          +
        </button>
        <>
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
        </>
      </StWrap>
    </>
  );
};

export default HostList;
