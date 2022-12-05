import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotsMap from "./SpotsMap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  New,
  Image,
  BannerSlider,
  SpotContainer,
  MainSearch,
  Section,
  InfoDiv,
  MainBanner,
  Icon,
  Info,
  SpotName,
  SixMatch,
  SpotInfoMain,
  WaitingMatchMain,
  TeamContainer,
  Info2,
} from "./Styles";
import TapBar from "../../components/TapBar";
import { LoginAPI, PrivateApi, SpotsMatchApi } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import ChatBtn from "../../components/ChatBtn";
import useDetectClose from "../../hooks/useDetectClose";
import ChatRoom from "../chat/ChatRoom";
import { WaitingMatch } from "../spotsDetail/Styles";
import { SpotInfo } from "../userpage/Styles";

const MainMaps = () => {
  const [newSpot, setNewSpot] = useState();
  const [newMatch, setNewMatch] = useState();
  const navigate = useNavigate();
  //chatbtn
  const [chatOpen, chatRef, chatHandler] = useDetectClose(false);
  //const chatOpenRef = useRef(null);

  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 300, // 애니메이션의 속도, 단위는 milliseconds
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
    adaptiveHeight: true,
    centerMode: true,
    // variableWidth: true,
  };

  useEffect(() => {
    PrivateApi.getNewSpot()
      .then((res) => {
        setNewSpot(res?.data?.data);
        // console.log('신규스팟', newSpot);
      })
      .catch((err) => console.log(err));

    SpotsMatchApi.getRecentMatch()
      .then((res) => {
        // console.log('임박매치대기팀들!', res);
        setNewMatch(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("왜 날짜 형식이 달라진거지", newMatch);
  // console.log(newSpot);
  // console.log('신규매치6개! 임박건!!!', newMatch);
  return (
    <>
      <Layout>
        <Header />
        <MainSearch
          alt=""
          src="/mainpage/mainSearch.png"
          onClick={() => navigate("/book")}
        />
        <MainBanner>
          <img alt="" src="/mainpage/mainBanner.png" />
        </MainBanner>
        <SpotContainer>
          <Section>최신 등록! MD 추천 스팟</Section>
          <BannerSlider {...settings}>
            {newSpot?.map((place, idx) => (
              <New
                key={idx}
                onClick={() => navigate(`/spotsdetail/${place.placesId}`)}
              >
                <Image alt="" src={place.image} />
                <div>
                  <InfoDiv>
                    <Info>
                      <div>
                        {place.sports === "테니스장" ? (
                          <>
                            <Icon alt="" src="/reservation/newTennis.png" />
                          </>
                        ) : null}
                        {place.sports === "배드민턴장" ? (
                          <>
                            <Icon alt="" src="/reservation/newBadminton.png" />
                          </>
                        ) : null}
                        {place.sports === "풋살장" ? (
                          <>
                            <Icon alt="" src="/reservation/newFutsal.png" />
                          </>
                        ) : null}
                      </div>
                      <SpotName>{place.spotName}</SpotName>
                      <div>
                        {place.address.split(" ")[0]}{" "}
                        {place.address.split(" ")[1]}{" "}
                        {place.address.split(" ")[2]}
                      </div>
                    </Info>
                  </InfoDiv>
                </div>
              </New>
            ))}
          </BannerSlider>
        </SpotContainer>
        <TeamContainer>
          <Section>매칭 대기 중! 경기 임박 팀</Section>
          {newMatch?.map((sixmatch, index) => {
            return (
              <SixMatch key={index}>
                <WaitingMatchMain>
                  <div>
                    <img alt="" src="/date.png" width="60px" />
                    {sixmatch.match?.date.substring(0, 2)}월
                    {sixmatch.match?.date.substring(3, 5)}일
                  </div>
                  <div>
                    <img alt="" src="/time.png" width="60px" />
                    {sixmatch.match?.matchId.substring(0, 13)}
                  </div>
                  <div>
                    {" "}
                    <img alt="" src="/people.png" width="70px" />
                    {sixmatch.match?.member}명
                    {/* {sixmatch.place.sports !== "풋살장" && (
                      <>{!sixmatch.match.isDoubled ? "복식" : "단식"} 경기</>
                    )} */}
                  </div>
                </WaitingMatchMain>
                <hr />
                <SpotInfoMain>
                  <img alt="구장이미지" src={sixmatch.place?.image} />
                  <Info2>
                    <button
                      onClick={() =>
                        navigate(`/spotsdetail/${sixmatch.place?.placesId}`)
                      }
                    >
                      {sixmatch.place?.spotName}
                    </button>
                    <div>
                      {sixmatch.place?.address.split(" ")[0]}{" "}
                      {sixmatch.place?.address.split(" ")[1]}{" "}
                      {sixmatch.place?.address.split(" ")[2]}
                    </div>
                  </Info2>
                </SpotInfoMain>
              </SixMatch>
            );
          })}
        </TeamContainer>
        <ChatBtn chatHandler={chatHandler} chatRef={chatRef} />
        <ChatRoom chatOpen={chatOpen} />
        <TapBar />
      </Layout>
    </>
  );
};

export default MainMaps;
