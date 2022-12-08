import Slider from "react-slick";
import styled from "styled-components";

export const MainSearch = styled.img`
  width: 100%;
  margin-top: 60px;
`;
export const MainBanner = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 98%;
  }
`;
export const SpotContainer = styled.div`
  overflow: hidden;
`;
export const Section = styled.div`
  margin: 15px 0px 8px 15px;
  font-size: 18px;
  font-weight: 900;
  font-family: SpoqaHanSansNeoBold;
`;
export const BannerSlider = styled(Slider)`
  .slick-slide div {
    margin: 0px 10px 0px 0px;
  }
  .slick-dots {
    color: red;
  }
  cursor: pointer;
`;
export const New = styled.div`
  width: 80%;
`;
export const Image = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
`;
export const InfoDiv = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 6.41%;
  border-radius: 10px;
  position: absolute;
  top: 60%;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  display: flex;
`;
export const Info = styled.div`
  width: 200px;
`;
export const Icon = styled.img`
  height: 25px;
  margin-bottom: 5px;
`;
export const SpotName = styled.div`
  font-weight: bold;
  font-size: 18px;
`;
export const TeamContainer = styled.div`
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
export const WaitingMatchMain = styled.div`
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
export const LastTime = styled.div`
  background-color: #ff00b4;
  color: white;
  border-radius: 10px;
  padding: 5px 7px;
  font-size: 13px;
  margin-right: 10px;
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
    height: 50px;
    object-fit: cover;
    margin: 0px 10px 0px 0px;
    border-radius: 10px;
  }
`;
export const Info2 = styled.div`
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
