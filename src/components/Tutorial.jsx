import Slider from "react-slick";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";

const Tutorial = ({ handleClose }) => {
  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    //speed: 300, // 애니메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    adaptiveHeight: true,
    variableWidth: true,
  };

  return (
    <Container>
      <JumpBtn onClick={handleClose}>
        <AiTwotoneHome size="25" />
      </JumpBtn>
      <TutorialSlider {...settings}>
        <div>
          <img alt="" src="/tutorial/tutorial_01.jpg" />
        </div>
        <div>
          <img alt="" src="/tutorial/tutorial_02.jpg" />
        </div>
        <div>
          <img alt="" src="/tutorial/tutorial_03.jpg" />
        </div>
        <div>
          <img alt="" src="/tutorial/tutorial_04.jpg" />
        </div>
        <div>
          <img alt="" src="/tutorial/tutorial_05.jpg" />
        </div>
      </TutorialSlider>
    </Container>
  );
};

export default Tutorial;

const TutorialSlider = styled(Slider)`
  .slick-list {
    /* width: 100vw; */
    /* height: 100vh; */
  }

  .slick-track {
    /* width: 100vw; */
    /* height: 100vh; */
  }

  .slick-slide img {
    object-fit: cover;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
  }

  .slick-track {
    /* width: 100vw; */
  }

  .slick-list {
    width: 100vw;
  }
`;

const Container = styled.div`
  position: fixed;
  z-index: 99999;

  img {
    width: 100vh;
    /* max-width: 400px; */
  }
`;

const JumpBtn = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999999;
  margin-top: 15px;
  margin-left: 80%;
  font-size: 16px;
  cursor: pointer;
  background-color: #c2c2c2;
  color: #fff;
  width: 45px;
  height: 45px;
  border-radius: 50px;
`;
