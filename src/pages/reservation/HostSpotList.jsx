import { useNavigate } from 'react-router-dom';
import { Place, PrivateBlock } from './Style';

const SpotList = ({ searchedSpot, allSpot }) => {
  const navigate = useNavigate();

  return (
    <>
      <Place>
        {searchedSpot.placesId ? (
          <>
          <PrivateBlock onClick={() => navigate(`/spotsdetail/${searchedSpot.placesId}`)}>
            {searchedSpot.spotName}
            <div>
              {searchedSpot.sports}
              <span>{searchedSpot.spotKind}</span>
              <span>{searchedSpot.price}</span>
            </div>
            </PrivateBlock>
          </>
        ) : (
          <>
            {searchedSpot.spotName}
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
