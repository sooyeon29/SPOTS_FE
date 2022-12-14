import { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { AiTwotoneHome } from "react-icons/ai";

const Tutorial = ({ handleClose }) => {
  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    adaptiveHeight: true,
    variableWidth: true,
  };

  const [currSlideIndex, setCurrSlideIndex] = useState(0);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Container>
      <JumpBtn onClick={handleClose}>
        <AiTwotoneHome size="25" />
      </JumpBtn>

      <TutorialSlider
        {...settings}
        afterChange={(currentSlide) => setCurrSlideIndex(currentSlide)}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const isActiveSlide = currSlideIndex === index;
          return (
            <Slide key={index}>
              <img alt="" src={`/tutorial/tutorial_0${index + 1}.jpg`} />
            </Slide>
          );
        })}
      </TutorialSlider>
    </Container>
  );
};

export default Tutorial;

const Container = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
`;

const JumpBtn = styled.button`
  position: absolute;
  z-index: 999999;
  top: 20px;
  right: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: #c2c2c2;
  color: #fff;
  width: 45px;
  height: 45px;
  border-radius: 50px;
`;

const TutorialSlider = styled(Slider)`
  position: absolute;
  overflow: hidden;

  top: 0;
  left: 0;
  height: 100vh;
  z-index: 99999;

  .slick-list {
    width: 100vw;
    height: 100vh;
  }

  .slick-track {
    width: 100vw;
    height: 100vh;
  }

  .slick-slide img {
    object-fit: cover;

    width: 100vw;
    max-width: 420px;
    box-sizing: border-box;
  }

  .slick-track {
    width: 100vw;
  }

  .slick-list {
    width: 100vw;
  }
`;

const Slide = styled.div``;
