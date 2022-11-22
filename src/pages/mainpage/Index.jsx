import { useEffect, useRef, useState } from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotsMap from "./SpotsMap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  UpperLine,
  BtnWrap,
  New,
  Image,
  BannerSlider,
  SpotContainer,
  MainBanner,
  Section,
  InfoDiv,
  LinkIcon,
  Icon,
  Info,
  SpotName,
} from "./Styles";
import TapBar from "../../components/TapBar";
import { LoginAPI, PrivateApi } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import ChatBtn from "../../components/ChatBtn";
import useDetectClose from "../../hooks/useDetectClose";
import ChatRoom from "../chat/ChatRoom";

const MainMaps = () => {
  const [sportsKind, setSportsKind] = useState("");
  const [newSpot, setNewSpot] = useState();
  const navigate = useNavigate();
  const futsal = "풋살장";
  const tennis = "테니스장";
  const badminton = "배드민턴장";

  //chatbtn
  const [chatOpen, chatRef, chatHandler] = useDetectClose(false);
  const chatOpenRef = useRef(null);

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
    const isMember = localStorage.getItem("loginId");
    // console.log(isMember);
    LoginAPI.kakaoId(isMember)
      .then((res) => {
        // console.log("여기===========================", res);
        if (res.data.loginId === null) return;
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          return;
        }
        if (res.data.loginId && !res.data.nickname) {
          navigate(`/addlogin`);
        }
      })
      .catch((err) => console.log(err));

    PrivateApi.getNewSpot()
      .then((res) => {
        setNewSpot(res?.data?.data);
        console.log(newSpot);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(newSpot);

  return (
    <>
      <Layout>
        <Header />
        <MainBanner src="mobileMainBanner.png" />
        {/* <MainMapLayout> */}
        <UpperLine>
          <BtnWrap>
            <button onClick={() => setSportsKind(futsal)}>풋살</button>
            <button onClick={() => setSportsKind(tennis)}>테니스</button>
            <button onClick={() => setSportsKind(badminton)}>배드민턴</button>
          </BtnWrap>
          <div>
            <span>● 공공스팟</span>
            <span>● 사설스팟</span>
          </div>
        </UpperLine>
        <SpotsMap sportsKind={sportsKind} />
        {/* </MainMapLayout> */}
        <SpotContainer>
          <Section>최신 등록 스팟</Section>
          <BannerSlider {...settings}>
            {newSpot?.map((place, idx) => (
              <New key={idx}>
                <Image src={place.image} />
                <div>
                  <InfoDiv>
                    <Info>
                      <div>
                        {place.sports === "테니스장" ? (
                          <>
                            <Icon src="/newTennis.png" />
                          </>
                        ) : null}
                        {place.sports === "배드민턴장" ? (
                          <>
                            <Icon src="/newBadminton.png" />
                          </>
                        ) : null}
                        {place.sports === "풋살장" ? (
                          <>
                            <Icon src="/newFutsal.png" />
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
                    <LinkIcon
                      onClick={() => navigate(`/spotsdetail/${place.placesId}`)}
                    >
                      〉
                    </LinkIcon>
                  </InfoDiv>
                </div>
              </New>
            ))}
          </BannerSlider>
        </SpotContainer>
        <ChatBtn chatHandler={chatHandler} chatRef={chatRef} />
        <ChatRoom chatOpen={chatOpen} chatOpenRef={chatOpenRef} />
        <TapBar />
      </Layout>
    </>
  );
};

export default MainMaps;
