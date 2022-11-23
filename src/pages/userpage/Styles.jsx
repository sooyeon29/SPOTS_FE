import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StWrap = styled.div`
  margin: auto;
  margin-top: 72px;
  width: 90%;
  /* background-color: #f1f1f1; */
  border-radius: 15px;
  /* margin-top: 50px; */
  margin-bottom: 50px;
  align-items: center;
  margin: 71px auto;
`;

export const TeamPhoto = styled.div`
  width: 30%;
  max-width: 800px;
  padding: 0px;
  overflow: hidden;
  /* margin: auto; */
  /* background-color: lightcyan; */
  border-radius: 10px;
  img {
    width: 100%;
    /* height: 350px; */
    object-fit: cover;
    border-radius: 10px;
    margin: auto;
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

export const PageDesc = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin: 80px 0px 20px 0px;
`;

export const StTag = styled.span`
  width: 20%;
  height: 40px;
  /* border: 1px solid lightgray; */
  /* border-radius: 15px; */
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;

export const StTeam = styled.div`
  width: 90%;

  border: 1px solid lightgray;
  border-radius: 15px;
  margin: auto;
`;

export const StTeamForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const MyMatch = styled.div`
  margin-bottom: 10px;
  border: 1px solid #1746c7;
  border-radius: 10px;
`;

export const SpotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;

  img {
    width: 100px;
    margin: 15px 10px 5px 15px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
    button {
      margin-top: 10px;
      margin-right: 25px;
      font-size: 22px;
      font-weight: bold;
      background-color: transparent;
      border: none;
    }
    p {
      margin: 5px;
    }
    span:last-child {
      color: #49e7a5;
      padding: 2px 8px;
      text-align: center;
      border-radius: 50px;
      font-size: 17px;
      font-weight: 700;
      background-color: black;
      position: relative;
      z-index: 2;
      top: 3px;
      left: 8px;
    }
  }
`;

export const HostCard = styled.div``;
export const Preview = styled.div``;
export const Photo = styled.div`
  ${Preview} {
    border: 1px solid black;
    height: 200px;
    width: 80%;
    /* margin-bottom: 20px; */
    line-height: 300px; //글자를 vertical로 중앙 정렬시 line-height 주고 vertical-align 주기
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
    img {
      //스타일드 컴포넌트내에 있는 태그
      object-fit: cover;
      background-color: beige;
      /* border: 1px solid black; */
    }
    div {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
export const UploadInput = styled.input``;
export const UploadInputDesign = styled.label``;

export const Upload = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  ${UploadInput} {
    /* display: none; */
  }

  ${UploadInputDesign} {
    display: inline-block;
    width: 130px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    background-color: lightgray;
    border-radius: 10px;
    margin-right: 10px;
    :hover {
      background: gray;
    }
  }
`;
export const MyHostList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const WordInfo = styled.div`
  margin: auto;
`;
export const ImageInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  img {
    border-radius: 10px;
    width: 120px;
    margin: 10px auto 10px 10px;
  }
`;
export const MySpot = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin: 7px auto;
    font-size: 20px;
    font-weight: bold;
  }
  div {
    margin: auto;
    padding: 0px 15px;
  }
`;
export const AboutMySpot = styled.div`
  display: flex;
  flex-direction: column;
  width: 210px;
`;

export const ButWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0px 40px 20px auto;
`;

export const MyReserve = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 72px;
  margin-bottom: 72px;
  align-items: center;
  /* background-color: aliceblue; */
`;

export const ReservedSpot = styled.div``;

export const AboutMatch = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
  /* text-shadow: 2px 2px 6px gray; */
`;
export const CompletedMath = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const WaitedMatch = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const SpotName = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
`;
export const MatchDate = styled.div`
  margin-bottom: 20px;
`;
export const MatchTime = styled.div``;
export const MatchMember = styled.div``;
export const MatchTeam = styled.div`
  margin-bottom: 20px;
`;

export const InfoLayout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;

  div:first-child {
    width: 100px;
    /* background-color: aliceblue; */
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
  }

  div:last-child {
    margin-left: 20px;
  }
`;

export const NickName = styled.div`
  margin-left: 20px;
  display: flex;
`;

export const SportsLayout = styled.div`
  padding: 10px;

  div:first-child {
    font-size: 14px;
    font-weight: 600;
  }

  img {
    width: 100px;
  }
`;

export const SportBlock = styled.div`
  display: flex;
  margin: auto;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  /* width: 390px; */
`;
export const SportTitle = styled.div`
  margin-bottom: 10px;
`;

export const ModifyBtn = styled.button`
  background: #d9d9d9;
  border-radius: 10px;
  border: none;
  margin-left: 80px;
  font-weight: 600;
`;
export const ReservTitle = styled.div`
  padding-top: 15px;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;
export const MoreInfo = styled.div`
  border: none;
  color: white;
  background-color: #1746c7;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`;
export const DayTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;
export const ForMatch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  margin: 10px 15px;
  button {
    background-color: transparent;
    border: none;
    font-size: 15px;
    color: red;
    font-weight: 700;
  }
`;
export const Btn = styled.button`
  width: 360px;
  height: 50px;
  color: #09225c;
  background-color: #00f78e;
  border-radius: 43px;
  border: none;
  font-weight: 700;
  font-size: 16px;
`;
