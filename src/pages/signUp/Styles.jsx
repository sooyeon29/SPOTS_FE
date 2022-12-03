import styled from "styled-components";

export const Red = styled.span`
  color: red;
`;

export const phonNum = styled.div`
  width: auto;
  cursor: pointer;
  color: #ff00b3;
  font-weight: 600;
  background-color: white;
  width: 80px;
  height: 40px;
  border: none;
`;

export const StWrap = styled.div`
  margin-top: 90px;
  /* background-color: #f1f1f1; */
  padding: 30px;
`;

export const PageTitle = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: 700;
  align-items: left;
  display: flex;
  justify-content: center;
`;

export const IdInput = styled.input`
  border: none;
  background-color: transparent;
  width: 200px;
  padding-left: 10px;
  :focus {
    outline: none;
  }
`;

export const PwInput = styled.input`
  border: none;
  width: 280px;
  padding-left: 10px;
  background-color: transparent;
  margin-bottom: 10px;
  margin-top: 10px;
  :focus {
    outline: none;
  }
`;

export const ContentWrap = styled.div`
  /* justify-content: center;
align-items: center; */
  text-align: center;
  /* margin: auto; */
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const FirstPage = styled.div`
  div {
  }
  input {
  }
`;
export const IdConfirmBtn = styled.button`
  /* margin-right: -68px; */
  /* margin-left: 10px; */
  width: auto;
  cursor: pointer;
  color: #ff00b3;
  font-weight: 600;
  background-color: white;
  width: 80px;
  height: 39px;
  border: none;
  /* border-bottom: 2px solid #ff00b3; */
`;

export const NextBtn = styled.button`
  border: none;
  height: 50px;
  margin-top: 40px;
  margin-bottom: 10px;
  background: #1746c7;
  color: white;
  border-radius: 47px;
  width: 330px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

export const SecondPage = styled.div`
  input {
    border: none;
    width: 220px;
    /* padding: 12px 15px; */
    margin: 10px 0px 10px 10px;
    background-color: transparent;
    :focus {
      outline: none;
    }
  }
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const ThirdPage = styled.div`
  input {
    border: none;
    width: 220px;
    margin: 10px 0px 10px 10px;
    background-color: transparent;

    :focus {
      outline: none;
    }
  }
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const GenderSelect = styled.div`
  /* display: flex; */
  /* background-color: black; */
`;

export const ForthPage = styled.div`
  margin: auto;
  /* display: flex; */
`;
export const MySports = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  /* background-color: aliceblue; */
`;

export const SportInput = styled.input`
  display: none;
`;

export const FootballInput = styled.input`
  display: none;
`;
export const TennisInput = styled.input`
  display: none;
`;
export const BadmintonInput = styled.input`
  display: none;
`;
export const RunningInput = styled.input`
  display: none;
`;
export const SwimmingInput = styled.input`
  display: none;
`;
export const BaseballInput = styled.input`
  display: none;
`;
export const BasketballInput = styled.input`
  display: none;
`;
export const GolfInput = styled.input`
  display: none;
`;
export const HealthInput = styled.input`
  display: none;
`;

export const SportLabel = styled.label`
  gap: 20px;
`;

export const SportDiv = styled.div`
  background-color: #fff;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #303030;
  border: 1.5px solid transparent;
  box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.1);
  font-size: 12px;

  ${SportInput}:checked + && {
    color: #ff00b3;
    border-color: #ff00b3;
  }
`;

export const FootballDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/football_gray.png");
  background-size: 90px;

  ${FootballInput}:checked + && {
    background-image: url("/mypage/football_blue.png");
    background-size: 90px;
  }
`;

export const TennisDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/tennis_gray.png");
  background-size: 90px;

  ${TennisInput}:checked + && {
    background-image: url("/mypage/tennis_blue.png");
    background-size: 90px;
  }
`;

export const BadmintonDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/badminton_gray.png");
  background-size: 90px;

  ${BadmintonInput}:checked + && {
    background-image: url("/mypage/badminton_blue.png");
    background-size: 90px;
  }
`;

export const SwimmingDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/swimming_gray.png");
  background-size: 90px;

  ${SwimmingInput}:checked + && {
    background-image: url("/mypage/swimming_blue.png");
    background-size: 90px;
  }
`;

export const BaseballDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/baseball_gray.png");
  background-size: 90px;

  ${BaseballInput}:checked + && {
    background-image: url("/mypage/baseball_blue.png");
    background-size: 90px;
  }
`;

export const BasketballDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/basketball_gray.png");
  background-size: 90px;

  ${BasketballInput}:checked + && {
    background-image: url("/mypage/basketball_blue.png");
    background-size: 90px;
  }
`;

export const RunningDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/running_gray.png");
  background-size: 90px;

  ${RunningInput}:checked + && {
    background-image: url("/mypage/running_blue.png");
    background-size: 90px;
  }
`;

export const GolfDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/golf_gray.png");
  background-size: 90px;

  ${GolfInput}:checked + && {
    background-image: url("/mypage/golf_blue.png");
    background-size: 90px;
  }
`;

export const HealthDiv = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/health_gray.jpg");
  background-size: 90px;

  ${HealthInput}:checked + && {
    background-image: url("/mypage/health_blue.jpg");
    background-size: 90px;
  }
`;

export const FavSports = styled.div`
  font-size: 14px;
  display: flex;
  width: 300px;
  gap: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const SportsBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const RecommendId = styled.input`
  border: none;
  /* width: 220px; */
  /* padding: 12px 15px; */
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: transparent;
  :focus {
    outline: none;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
`;

export const GrayBorder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 10px;
  /* padding-top: 7px; */
  padding: 3px 0px 3px 18px;
  width: 310px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 14px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const RecommendTitle = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: 700;
  align-items: left;
  display: flex;
  justify-content: center;
`;
