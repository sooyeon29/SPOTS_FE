import Slider from 'react-slick';
import styled from 'styled-components';

export const StWrap = styled.div`
  margin-top: 62px;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
`;

export const MainElement = styled.div`
  /* width: 390px; */
  margin: auto;
`
export const MainBanner = styled.img`
  width: 100%;
  margin-top: 62px;
`;
export const UpperLine = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px 10px 10px 10px;

  button {
    width: auto;
    height: 30px;
    margin-right: 10px;
    border-radius: 20px;
    padding: 0px 10px 0px 10px;
    border: 2px solid black;
    cursor: pointer;
  }

  span {
    margin-right: 10px;
    font-weight: 600;
  }

  span:first-child {
    color: #2b2bff;
  }

  span:last-child {
    color: #ff00b3;
  }
`;

export const SearchBox = styled.form`
  margin: 30px;
`;

export const Container = styled.div`
  background-color: #fff;
  width: auto;
  border-radius: 10px;
  background-color: #d5f103;
  border: solid 2px white;
`;


export const BtnWrap = styled.div`
  border: none;
  border-radius: 30px;
  background-color: white;
  width: 330px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

  button {
    width: 90px;
    height: 30px;
    margin: auto;
    border: none;
    cursor: pointer;
    border-radius: 23px;
    :focus {
      background-color: #2b2bff;
      color: white;
    }
  }
  z-index: 2;
  top: 370px;
  right: 8%;
  position: absolute;
`;

export const BannerSlider = styled(Slider)`
  .slick-slide div {
    /* border-radius: 10px; */
    margin: 0px 10px 0px 0px;
  }
  .slick-dots {
    color: red;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  /* border: 2px solid #49E7A5; */
  margin-bottom: 80px;
`;

export const SpotContainer = styled.div`
  overflow: hidden;
  /* width: 50%; */
  /* height: 300px; */
  /* background-color: ghostwhite; */
  margin-bottom: 60px;
`;

export const New = styled.div`
  border: 2px sold black;
  width: 80%;
`;

export const Section = styled.div`
  margin: 30px 0px 10px 10px;
  font-weight: 600;
`;

export const InfoDiv = styled.div`
  background-color: #fff;
  padding: 10px;
  width: 260px;
  border-radius: 10px;
  position: absolute;
  top: 60%;
  box-shadow: 0px 20px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  /* border: 2px solid #49E7A5; */
`;

export const Icon = styled.img`
  height: 25px;
  margin-bottom: 5px;
`;

export const LinkIcon = styled.div`
  background-color: #eaeffc;
  justify-content: center;
  display: flex;
  align-items: center;
  min-width: 70px;
  min-height: 70px;
  border-radius: 50%;
  font-size: 30px;
  color: #1746c7;
  font-weight: 900;
  cursor: pointer;
`;

export const Info = styled.div`
  width: 200px;
`;

export const SpotName = styled.div`
  font-weight: 600;
`;

export const MapBlock = styled.div`
  width: 400px;
  height: 200px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
