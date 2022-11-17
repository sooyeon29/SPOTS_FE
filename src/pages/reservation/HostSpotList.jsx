import { useNavigate } from "react-router-dom";
import { Place, PrivateBlock, PublicBlock } from "./Style";

const SpotList = ({ searchedSpot }) => {
  const navigate = useNavigate();

  console.log(searchedSpot);

  // return

  return (
    <>
      <Place>
        {searchedSpot.placesId ? (
          <>
            <PrivateBlock
              onClick={() => navigate(`/spotsdetail/${searchedSpot.placesId}`)}
            >
              <div>
                {searchedSpot.sports === "테니스장" ? (
                  <img alt="tennis img" src="/privateTennis.png" />
                ) : (
                  <>
                    {searchedSpot.sports === "풋살장" ? (
                      <img alt="futsal img" src="/privateFutsal.png" />
                    ) : (
                      <img alt="badminton img" src="/privateBadminton.png" />
                    )}
                  </>
                )}
              </div>
              <div>
                <p>{searchedSpot.spotName}</p>
                <p>{searchedSpot.spotKind}</p>
                <p>{searchedSpot.price}</p>
              </div>
            </PrivateBlock>
          </>
        ) : (
          <>
            <a href={searchedSpot.svcurl}>
              <PublicBlock>
                <div>
                  {searchedSpot.minclassnm === "테니스장" ? (
                    <img alt="tennis img" src="/publicTennis.png" />
                  ) : (
                    <>
                      {searchedSpot.minclassnm === "풋살장" ? (
                        <img alt="futsal img" src="/publicFutsal.png" />
                      ) : (
                        <img alt="badminton img" src="/publicBadminton.png" />
                      )}
                    </>
                  )}
                </div>
                <div>
                  <p>{searchedSpot.spotName}</p>
                  <p>{searchedSpot.svcstatnm}</p>
                  <p>{searchedSpot.svcnm}</p>
                </div>
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
