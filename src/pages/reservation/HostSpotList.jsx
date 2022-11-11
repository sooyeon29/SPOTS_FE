import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HostSpots, MapPlace, Place, PlaceList } from "./Style";

const SpotList = () => {
  const navigate = useNavigate();
  const placeList = useSelector((state) => state?.privateSpot.privateSpot);
  console.log("플레이스리스트에들은거", placeList);

  return (
    <>
      <HostSpots>
        <MapPlace>??</MapPlace>
        <PlaceList>
          {placeList.data?.map((place) => {
            console.log("아이디왜안나왕", place.placeId);
            return (
              <Place>
                <h3>{place.spotName}</h3>
                <button
                  onClick={() => navigate(`/spotsdetail/${place.placeId}`)}
                >
                  예약하러가기
                </button>
                <div>
                  {place.sports}
                  <span>{place.spotKind}</span>
                  <span>{place.price}</span>
                </div>
              </Place>
            );
          })}
        </PlaceList>
      </HostSpots>
    </>
  );
};

export default SpotList;
