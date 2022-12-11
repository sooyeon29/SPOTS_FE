import { useNavigate, useParams } from "react-router-dom";
import {
  PrivateBlock,
  PublicBlock,
  Status,
  PublicReserve,
  UpperLine,
  LowerLine,
  PublicInfo,
  NoResult,
} from "./Styles";
import { CgSearchLoading } from "react-icons/cg";

const SpotList = ({ spotList }) => {
  const navigate = useNavigate();
  const param = useParams();

  if (spotList === undefined) {
    return (
      <NoResult>
        <p>
          <CgSearchLoading style={{ fontSize: "40px", marginBottom: "10px" }} />
        </p>
        <p>'{param.keywords}'에 해당하는 검색 결과가 없어요!</p>
        <p>다른 키워드로 검색해볼까요?</p>
      </NoResult>
    );
  } else {
    return (
      <>
        {spotList?.private.map((privSpot, idx) => {
          return (
            <PrivateBlock
              key={privSpot.placesId}
              onClick={() => navigate(`/spotsdetail/${privSpot.placesId}`)}
            >
              <UpperLine>
                <div>
                  {privSpot.sports === "테니스장" ? (
                    <img alt="tennis img" src="/reservation/newTennis.png" />
                  ) : (
                    <>
                      {privSpot.sports === "풋살장" ? (
                        <img
                          alt="futsal img"
                          src="/reservation/newFutsal.png"
                        />
                      ) : (
                        <img
                          alt="badminton img"
                          src="/reservation/newBadminton.png"
                        />
                      )}
                    </>
                  )}
                </div>
                <div>
                  <span>●</span> 사설
                </div>
              </UpperLine>
              <div>
                <p>{privSpot.spotName}</p>
                <p>
                  {privSpot.address.split(" ")[0]}{" "}
                  {privSpot.address.split(" ")[1]}{" "}
                  {privSpot.address.split(" ")[2]}{" "}
                  {privSpot.address.split(" ")[3]}
                </p>
              </div>
            </PrivateBlock>
          );
        })}
        {spotList?.public.map((pubSpot, idx) => {
          return (
            <PublicReserve
              href={pubSpot.svcurl}
              target="_blank"
              key={pubSpot.opensId}
            >
              <PublicBlock>
                <LowerLine>
                  <div>
                    {pubSpot.minclassnm === "테니스장" ? (
                      <img alt="tennis img" src="/reservation/newTennis.png" />
                    ) : (
                      <>
                        {pubSpot.minclassnm === "풋살장" ? (
                          <img
                            alt="futsal img"
                            src="/reservation/newFutsal.png"
                          />
                        ) : (
                          <img
                            alt="badminton img"
                            src="/reservation/newBadminton.png"
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    <span>●</span> 공공
                  </div>
                </LowerLine>
                <PublicInfo>
                  <span>{pubSpot.placenm}</span>
                  <Status>{pubSpot.svcstatnm}</Status>
                  <p>{pubSpot.svcnm}</p>
                  <p>서울시 {pubSpot.areanm}</p>
                </PublicInfo>
              </PublicBlock>
            </PublicReserve>
          );
        })}
      </>
    );
  }
};

export default SpotList;
