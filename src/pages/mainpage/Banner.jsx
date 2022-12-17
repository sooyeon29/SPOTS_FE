import React from "react";
import { BannerImg, MainBanner } from "./Styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 300, // 애니메이션의 속도, 단위는 milliseconds
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    adaptiveHeight: true,
  };

  return (
    <MainBanner {...settings}>
      <img alt="mainBanner" src="/mainpage/mainBanner.png" />
      <BannerImg alt="mainBanner2" src="/mainpage/mainBanner02.jpeg" />
      <BannerImg alt="mainBanner3" src="/mainpage/mainBanner03.jpeg" />
      <BannerImg alt="mainBanner4" src="/mainpage/mainBanner04.jpeg" />
    </MainBanner>
  );
};

export default Banner;
