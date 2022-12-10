import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyPrivateSpot } from "../../../redux/modules/spotsSlice";
import Layout from "../../../components/Layout";
import FlexibleHeader from "../../../components/FlexibleHeader";
import TapBar from "../../../components/TapBar";
import {
  MyMatch,
  StWrapHostList,
  SpotImage,
  SpotInfos,
  SpotIcons,
  ResisterBtn,
  StWrap,
} from "./Styles";

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
      <StWrapHostList>
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
      </StWrapHostList>
      <TapBar />
    </Layout>
  );
};

export default HostList;
