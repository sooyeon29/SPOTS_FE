import { useEffect, useState } from "react";
import { PrivateApi, SpotsMatchApi } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
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
                <WaitingMatchMain>
                  <div>
                    <img alt="" src="/date.png" width="60px" />
                    {sixmatch.match?.date.substring(6, 8)}월
                    {sixmatch.match?.date.substring(10, 13)}일
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
  margin: 10px 0px 10px 10px;
  font-size: 16px;
  font-weight: 800;
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
  width: 95%;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  padding-top: 10px;
  hr {
    border: none;
    border-top: 1px dashed #d9d9d9;
    color: #d9d9d9;
    background-color: transparent;
    height: 1px;
    width: 100%;
  }
`;

const WaitingMatchMain = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  margin: 3px;
  padding: 2px;
  div {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    padding: 3px;
    img {
      margin-bottom: 10px;
    }
  }
`;

const SpotInfoMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 350px;
  margin-bottom: 10px;
  img {
    width: 70px;
    height: 50px;
    object-fit: cover;
    margin: 0px 25px 0px 25px;
    border-radius: 10px;
  }
`;

const Info2 = styled.div`
  width: 100%;
  padding: 0px 10px;
  button {
    /* margin-top: 7px; */
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