import { useEffect, useState } from "react";
import { PrivateApi, SpotsMatchApi } from "../../tools/instance";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useDetectClose from "../../hooks/useDetectClose";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChatBtn from "../../components/ChatBtn";
import ChatRoom from "../chat/ChatRoom";

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
      })
      .catch((err) => console.log(err));

    SpotsMatchApi.getRecentMatch()
      .then((res) => {
        setNewMatch(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
                <Link
                  to={`/spotsdetail/${sixmatch.place?.placesId}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <WaitingMatchMain>
                    <div>
                      <img alt="" src="/mainpage/date.png" width="25px" />
                      <span>
                        {sixmatch.match?.date.substring(6, 8)}월
                        {sixmatch.match?.date.substring(10, 13)}일
                      </span>
                    </div>
                    <LastTime>마감임박</LastTime>
                  </WaitingMatchMain>
                  <WaitingMatchMain2>
                    <div>
                      <img alt="" src="/mainpage/time.png" width="25px" />
                      <span>{sixmatch.match?.matchId.substring(0, 13)}</span>
                    </div>
                    <div>
                      <img alt="" src="/mainpage/people.png" width="25px" />
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

const MainSearch = styled.img`
  width: 100%;
  margin-top: 60px;
`;

const MainBanner = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 98%;
  }
`;

const SpotContainer = styled.div`
  overflow: hidden;
  margin-top: 20px;
`;

const Section = styled.div`
  margin: 15px 0px 8px 15px;
  font-size: 18px;
  font-weight: 900;
  font-family: SpoqaHanSansNeoBold;
`;

const BannerSlider = styled(Slider)`
  .slick-slide div {
    /* border-radius: 10px; */
    margin: 0px 10px 0px 0px;
  }
  .slick-dots {
    color: red;
  }
  cursor: pointer;
`;

const New = styled.div`
  width: 80%;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
`;

const InfoDiv = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 6.41%;
  border-radius: 10px;
  position: absolute;
  top: 60%;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const Info = styled.div`
  width: 200px;
`;

const Icon = styled.img`
  height: 25px;
  margin-bottom: 5px;
`;

const SpotName = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const TeamContainer = styled.div`
  margin-bottom: 65px;
`;

export const SixMatch = styled.div`
  background-color: #f7f8f8;
  width: 95%;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  padding-top: 10px;
  padding-left: 25px;
`;

const WaitingMatchMain = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  margin: 3px;
  padding: 2px;
  font-size: 15px;
  div {
    display: flex;
    align-items: center;
    img {
      margin: 0px 10px 10px 0px;
    }
    span {
      margin: 0px 10px 10px 0px;
    }
  }
`;
const LastTime = styled.div`
  background-color: #ff00b4;
  color: white;
  border-radius: 10px;
  padding: 5px 7px;
  font-size: 13px;
  margin-right: 10px;
`;
const WaitingMatchMain2 = styled(WaitingMatchMain)`
  div {
    width: 50%;
  }
`;

const SpotInfoMain = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  margin-bottom: 10px;

  img {
    width: 70px;
    height: 50px;
    object-fit: cover;
    margin: 0px 10px 0px 0px;
    border-radius: 10px;
  }
`;

const Info2 = styled.div`
  width: 100%;
  padding: 0px 10px;
  button {
    font-size: 18px;
    font-weight: bold;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #000;
  }
  div {
    margin-left: 6px;
  }
`;
