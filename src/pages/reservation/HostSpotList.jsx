import { useNavigate } from "react-router-dom";
import { Place } from "./Style";

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
