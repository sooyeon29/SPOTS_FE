import Slider from "react-slick";
import styled from "styled-components";

export const MainSearch = styled.img`
  max-width: 420px;
  width: 100%;
  margin-top: 40px;
  cursor: pointer;
`;

export const MainBanner = styled(Slider)`
  .slick-slide div {
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 420px;
  }

  img {
    width: 98%;
  }
`;

export const SpotContainer = styled.div`
  overflow: hidden;
  margin-top: 20px;
`;

export const Section = styled.div`
  margin: 0px 0px 8px 10px;
  font-size: 18px;
  font-weight: 700;
`;

export const BannerSlider = styled(Slider)`
  .slick-list {
    margin-left: 5px;
  }
  cursor: pointer;
`;

export const New = styled.div`
  height: 210px;
  margin-left: 20px;
`;

export const Image = styled.img`
  width: 175px;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
`;

export const InfoDiv = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 155px;
  height: 55px;
  border-radius: 10px;
  position: absolute;
  top: 60%;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
`;

export const Info = styled.div`
  width: 165px;
  div {
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Icon = styled.img`
  height: 18px;
  margin-bottom: 5px;
`;

export const SpotName = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const TeamContainer = styled.div`
  margin-bottom: 65px;
  margin-top: 10px;
`;

export const SixMatch = styled.div`
  background-color: #f0f0f0;
  width: 370px;
  height: 180px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 15px;
`;

export const WaitingMatchMain = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  font-size: 15px;
  div {
    display: flex;
    align-items: center;
    img {
      margin: 0px 7px 13px 0px;
    }
    span {
      margin: 0px 10px 13px 0px;
      font-size: 14px;
    }
  }
`;

export const LastTime = styled.div`
  background-color: #ff00b4;
  color: white;
  border-radius: 10px;
  padding: 5px 7px;
  font-size: 13px;
`;

export const WaitingMatchMain2 = styled(WaitingMatchMain)`
  div {
    width: 50%;
  }
`;

export const SpotInfoMain = styled.div`
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
    height: 70px;
    object-fit: cover;
    margin: 0px 10px 0px 0px;
    border-radius: 10px;
  }
`;

export const Info2 = styled.div`
  width: 100%;
  button {
    font-size: 15px;
    font-weight: bold;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #000;
  }
  div {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const BannerImg = styled.img`
  border-radius: 8px;
`;
