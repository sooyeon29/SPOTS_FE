import { useNavigate } from 'react-router-dom';
import { Place, PrivateBlock, PublicBlock } from './Style';

const SpotList = ({ searchedSpot }) => {
  const navigate = useNavigate();

  return (
    <>
      <Place>
        {searchedSpot.placesId ? (
          <>
            <PrivateBlock
              onClick={() => navigate(`/spotsdetail/${searchedSpot.placesId}`)}>
              <div>{searchedSpot.spotName}</div>
                <div>{searchedSpot.sports}</div>
                <div>{searchedSpot.spotKind}</div>
                <div>{searchedSpot.price}</div>
            </PrivateBlock>
          </>
        ) : (
          <>
          <a href={searchedSpot.svcurl}>
          <PublicBlock>
            <div>{searchedSpot.spotName}</div>
            <div>{searchedSpot.svcstatnm}</div>
            <div>{searchedSpot.minclassnm}</div>
            <div>{searchedSpot.svcnm}</div>
            </PublicBlock>
            </a>
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
