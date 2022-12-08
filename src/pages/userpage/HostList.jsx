import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyPrivateSpot } from "../../redux/modules/spotsSlice";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";

const HostList = () => {
  const title = "나의 스팟";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, []);
  const placeList = useSelector((state) => state.spots.myPrivateSpot);

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        {placeList?.map((place) => {
          return (
            <MyMatch
              onClick={() => {
                navigate(`/hostdetail/${place.placesId}`);
              }}
              key={place?.placesId}
            >
              <SpotImage>
                <img alt="구장 이미지" src={place?.image} />
              </SpotImage>
              <SpotInfos>
                <div>{place?.spotName}</div>
                <div>
                  {place?.address?.split(" ")[0]}{" "}
                  {place?.address?.split(" ")[1]}{" "}
                  {place?.address?.split(" ")[2]}
                </div>
                <div> {place?.spotKind} </div>
              </SpotInfos>
              <SpotIcons>
                <div>
                  {place?.sports === "배드민턴장" ? (
                    <>
                      <img alt="badminton_img" src="/host_badminton.png" />
                    </>
                  ) : null}
                  {place?.sports === "풋살장" ? (
                    <>
                      <img alt="soccer_img" src="/host_football.png" />
                    </>
                  ) : null}
                  {place?.sports === "테니스장" ? (
                    <>
                      <img alt="tennis_img" src="/host_tennis.png" />
                    </>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    navigate(`/hostdetail/${place.placesId}`);
                  }}
                >
                  <img alt="상세보기" src="/more.png" />
                </div>
              </SpotIcons>
            </MyMatch>
          );
        })}

        <ResisterBtn onClick={() => navigate(`/hosting`)}>
          <div>
            <img alt="구장추가아이콘" src="/plus_icon.png" />
          </div>
          <div>나의 스팟 등록하기</div>
        </ResisterBtn>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default HostList;

const MyMatch = styled.div`
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 100px;
`;

const SpotImage = styled.div`
  margin-right: 10px;
  img {
    width: 100px;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SpotInfos = styled.div`
  width: 300px;
  margin-right: 10px;
  margin-bottom: 5px;

  div:first-child {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const SpotIcons = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 30px;
  }

  div:last-child {
    cursor: pointer;
    img {
      width: 5px;
      display: flex;
      float: right;
      margin-bottom: 10px;
    }
  }
  background-color: transparent;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ResisterBtn = styled.div`
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  min-height: 100px;
  margin: auto;
  margin-bottom: 20px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;

  div:first-child {
    width: 120px;
    background-color: #c4c4c4;
    border-radius: 10px;
    display: flex;
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
      margin: auto;
    }
  }

  div:last-child {
    width: 300px;
    font-size: 20px;
    font-weight: 600;
    margin: auto;
  }
`;
