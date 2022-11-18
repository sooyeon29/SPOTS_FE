import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 300, // 애니메이션의 속도, 단위는 milliseconds
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <Container>
      <BannerSlider {...settings}>
        <div>
          <Image src="/mainBanner.png" />
        </div>
        <div>
          <Image src="/banner1.png" />
        </div>
        <div>
          <Image src="/banner2.png" />
        </div>
        <div>
          <Image src="/banner3.png" />
        </div>
      </BannerSlider>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  margin-top: 61px;
  overflow: hidden;
  width: 100%;
  height: 230px;
  background-color: ghostwhite;
`;

const BannerSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-dots {
    color: red;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: 230px;
`;
