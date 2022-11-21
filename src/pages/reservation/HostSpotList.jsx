import { useNavigate } from "react-router-dom";
import { PrivateBlock, PublicBlock, Status } from "./Style";

const SpotList = ({ spotList }) => {
  const navigate = useNavigate();
  // console.log("----검색결과(사설)----", spotList?.private);
  // console.log("----검색결과(공공)----", spotList?.public);

  return (
    <>
      {spotList?.private.map((privSpot) => {
        return (
          <PrivateBlock
            onClick={() => navigate(`/spotsdetail/${privSpot.placesId}`)}
          >
            <div>
              {privSpot.sports === "테니스장" ? (
                <img alt="tennis img" src="/privateTennis.png" />
              ) : (
                <>
                  {privSpot.sports === "풋살장" ? (
                    <img alt="futsal img" src="/privateFutsal.png" />
                  ) : (
                    <img alt="badminton img" src="/privateBadminton.png" />
                  )}
                </>
              )}
            </div>
            <div>
              <p>{privSpot.spotName}</p>
              <p>{privSpot.spotKind}</p>
              <p>{privSpot.address.split("", 6)}</p>
            </div>
          </PrivateBlock>
        );
      })}
      {spotList?.public.map((pubSpot) => {
        return (
          <PublicBlock>
            <div>
              {pubSpot.minclassnm === "테니스장" ? (
                <img alt="tennis img" src="/publicTennis.png" />
              ) : (
                <>
                  {pubSpot.minclassnm === "풋살장" ? (
                    <img alt="futsal img" src="/publicFutsal.png" />
                  ) : (
                    <img alt="badminton img" src="/publicBadminton.png" />
                  )}
                </>
              )}
            </div>
            <div>
            <Status>{pubSpot.svcstatnm}</Status>
              <span>
                {pubSpot.placenm}
              </span>
              <p>{pubSpot.svcnm}</p>
              <p>서울시 {pubSpot.areanm}</p>
            </div>
          </PublicBlock>
        );
      })}
    </>
  );
};

export default SpotList;
