import styled from "styled-components";

//TeamDetail
export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  width: 80%;
`;

export const InputText = styled.input`
  display: flex;
  border-radius: 10px;
  font-size: 18px;
  padding-left: 10px;
  width: 130px;
  height: 30px;
  margin-right: 20px;
  border: 1px solid #cecece;
  :focus {
    outline: none;
  }
`;

export const TeamLayout = styled.div`
  display: flex;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  width: 90%;
  margin: auto;
  div:first-child {
    width: 100px;
    text-align: center;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }

  div:last-child {
    font-size: 14px;
    img {
      width: 53px;
      height: 53px;
      border-radius: 10px;
      margin: 0;
    }
  }
`;

export const Btn = styled.button`
  width: 80%;
  height: 52px;
  background-color: #cecece;
  border: none;
  border-radius: 47px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const SaveBtn = styled.button`
  width: 80%;
  height: 52px;
  background-color: #1746c7;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 47px;
  line-height: 52px;
  text-align: center;
  border: none;
  margin-top: 50px;
  cursor: pointer;
`;

export const PlusBtn = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #1746c7;
  border-radius: 20px;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

export const MinusBtn = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 20px;
  color: #231f20;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

export const CountBox = styled.div`
  width: 80px;
  height: 30px;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-right: -10px;
  z-index: 1;
`;

export const StTeamForm = styled.form`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-top: 15px;
  }
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    /* transform: translate(50, 50); */
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

//TeamPage
export const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TeamBox = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TeamCardFootball = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/userpage/football.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

export const TeamCardTennis = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/userpage/tennis.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

export const TeamCardBadminton = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/userpage/badminton.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

export const TeamName = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 100px;
  margin-left: 30px;
`;

export const TeamMember = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding: 0;
    font-size: 25px;
    margin-top: -10px;
  }
`;

export const BtnTeamPage = styled.button`
  width: 360px;
  height: 50px;
  color: #09225c;
  background-color: #00f78e;
  border-radius: 43px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

//TeamRegister
export const StWrapTR = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const StTeamFormTR = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputBoxTR = styled.div`
  margin: auto;
`;

export const InputTextTR = styled.input`
  display: flex;
  border: 1px solid #cecece;
  border-radius: 10px;
  width: 200px;
  padding-left: 10px;
  height: 30px;
  :focus {
    outline: none;
  }
`;

export const TeamLayoutTR = styled.div`
  display: flex;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  width: 90%;
  margin: auto;
  div:first-child {
    width: 50px;
    text-align: center;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }
`;

export const SportsLayout = styled.div`
  display: flex;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  width: 90%;
  margin: auto;
  div:first-child {
    width: 50px;
    text-align: center;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }

  div:last-child {
    margin-right: 10px;
  }
`;

export const BtnTR = styled.button`
  width: 90%;
  height: 52px;
  background-color: #1746c7;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 47px;
  line-height: 52px;
  text-align: center;
  border: none;
  margin-top: 50px;
  cursor: pointer;
`;

export const SpotsLabel = styled.label``;

export const FootballInput = styled.input`
  display: none;
`;

export const TennisInput = styled.input`
  display: none;
`;

export const BadmintonInput = styled.input`
  display: none;
`;

export const FootballDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/football_gray.png");
  background-size: 55px;

  ${FootballInput}:checked + && {
    background-image: url("/mypage/football_blue.png");
    background-size: 55px;
  }

  img {
    width: 60px;
    height: 60px;
  }
`;

export const TennisDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/tennis_gray.png");
  background-size: 55px;

  ${TennisInput}:checked + && {
    background-image: url("/mypage/tennis_blue.png");
    background-size: 55px;
  }
`;

export const BadmintonDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/badminton_gray.png");
  background-size: 55px;

  ${BadmintonInput}:checked + && {
    background-image: url("/mypage/badminton_blue.png");
    background-size: 55px;
  }
`;

export const PlusBtnTR = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #1746c7;
  border-radius: 20px;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

export const MinusBtnTR = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 30px;
  color: #231f20;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

export const CountBoxTR = styled.div`
  width: 80px;
  height: 30px;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-right: -10px;
  z-index: 1;
`;

export const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HostingPhotoUpload = styled.div`
  img {
    width: 20px;
    position: absolute;
  }
`;

export const HostPreview = styled.div`
  img {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    object-fit: cover;
  }
`;

export const Preview = styled.div`
  div:first-child {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;
    border-radius: 100px;
  }
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  border-radius: 100px;
`;

export const ProfilePhotoInput = styled.input`
  display: none;
`;
