import { useNavigate } from 'react-router-dom';
import { Place } from './Style';

const SpotList = ({ searchedSpot }) => {
  const navigate = useNavigate();

  return (
    <>
      <Place>
        { searchedSpot.placesId ? (
          <>
            <h3>{searchedSpot.spotName}</h3>
            <button
              onClick={() => navigate(`/spotsdetail/${searchedSpot.placesId}`)}>
              매칭 신청하기
            </button>
            <div>
              {searchedSpot.sports}
              <span>{searchedSpot.spotKind}</span>
              <span>{searchedSpot.price}</span>
            </div>
          </>
        ) : (
          <>
            <h3>{searchedSpot.spotName}</h3>
            공공시설
          </>
        )}
        {/* <h3>{searchedSpot.spotName}</h3>
        <button
          onClick={() => navigate(`/spotsdetail/${searchedSpot.placesId}`)}>
          예약하러가기
        </button>
        <div>
          {searchedSpot.sports}
          <span>{searchedSpot.spotKind}</span>
          <span>{searchedSpot.price}</span>
        </div> */}
      </Place>
    </>
  );
};

export default SpotList;
