import { useEffect, useState } from "react";
import { PrivateApi, SpotsMatchApi } from "../../tools/instance";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useDetectClose from "../../hooks/useDetectClose";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChatBtn from "../../components/ChatBtn";
import ChatRoom from "../chat/ChatRoom";
import {
  BannerSlider,
  Icon,
  Image,
  Info,
  Info2,
  InfoDiv,
  LastTime,
  MainBanner,
  MainSearch,
  New,
  Section,
  SixMatch,
  SpotContainer,
  SpotInfoMain,
  SpotName,
  TeamContainer,
  WaitingMatchMain,
  WaitingMatchMain2,
} from "./Styles";
import Tutorial from "../../components/Tutorial";
import { margin } from "polished";
import Banner from "./Banner";

const MainMaps = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem("hasVisitedBefore");
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
    slidesToShow: 2.21, // 한번에 몇개의 슬라이드를 보여줄지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
  };

  useEffect(() => {
    PrivateApi.getNewSpot()
      .then((res) => {
        setNewSpot(res?.data?.data);
      })
      .catch((err) => console.log(err));

    SpotsMatchApi.getRecentMatch()
      .then((res) => {
        setNewMatch(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleShowTutorial = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }
      if (!HAS_VISITED_BEFORE) {
        setShowTutorial(true);

        let expires = new Date();
        expires = expires.setMonth(expires.getMonth() + 12);
        localStorage.setItem("hasVisitedBefore", expires);
      }
    };
    window.setTimeout(handleShowTutorial);
  }, [HAS_VISITED_BEFORE]);
  const handleClose = () => setShowTutorial(false);

  return (
    <>
      <Layout>
        {showTutorial && <Tutorial handleClose={handleClose} />}
        <Header />
        <MainSearch
          alt=""
          src="/mainpage/mainSearch.png"
          onClick={() => navigate("/book")}
        />
        <Banner />
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
                <Link
                  to={`/spotsdetail/${sixmatch.place?.placesId}`}
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <WaitingMatchMain>
                    <div>
                      <img
                        alt=""
                        src="/mainpage/date.png"
                        width="23px"
                        loading="lazy"
                        decoding="async"
                      />
                      <span>
                        {sixmatch.match?.date.substring(6, 8)}월
                        {sixmatch.match?.date.substring(10, 13)}일
                      </span>
                    </div>
                    <LastTime>마감임박</LastTime>
                  </WaitingMatchMain>
                  <WaitingMatchMain2>
                    <div>
                      <img alt="" src="/mainpage/time.png" width="23px" />
                      <span>{sixmatch.match?.matchId.substring(0, 13)}</span>
                    </div>
                    <div>
                      <img alt="" src="/mainpage/people.png" width="23px" />
                      <span>{sixmatch.match?.member}명</span>
                    </div>
                  </WaitingMatchMain2>
                  <SpotInfoMain>
                    <img alt="구장이미지" src={sixmatch.place?.image} />
                    <Info2>
                      <button>{sixmatch.place?.spotName}</button>
                      <div>
                        {sixmatch.place?.address.split(" ")[0]}{" "}
                        {sixmatch.place?.address.split(" ")[1]}{" "}
                        {sixmatch.place?.address.split(" ")[2]}
                      </div>
                    </Info2>
                  </SpotInfoMain>
                </Link>
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
