import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import { HostSpots, MapPlace, Place, PlaceList } from "./Style";

const SpotList = ({ place }) => {
  const navigate = useNavigate();

  return (
    <>
      <Place>
        <h3>{place.spotName}</h3>
        <button onClick={() => navigate(`/spotsdetail/${place.placesId}`)}>
          예약하러가기
        </button>
        <div>
          {place.sports}
          <span>{place.spotKind}</span>
          <span>{place.price}</span>
        </div>
      </Place>
    </>
  );
};

export default SpotList;
