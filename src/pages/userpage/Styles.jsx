import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StWrap = styled.div`
  //margin: auto;
  //margin-top: 72px;
  //width: 90%;
  /* background-color: #f1f1f1; */
  //border-radius: 15px;
  margin-bottom: 50px;
  //align-items: center;
  //margin: 71px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  font-weight: 700;
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
  width: 100%;
  /* background-color: beige; */
  /* border: 1px solid lightgray; */
  /* border-radius: 15px; */
  margin: auto;
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
export const MyMatch = styled.div`
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  margin: auto;
  /* margin-top: 0px; */
  margin-bottom: 20px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
export const MyMatch2 = styled.div`
  background-color: transparent;
  margin-bottom: 10px;
  border: 1px solid #1746c7;
  border-radius: 11px;
`;

export const ResisterBtn = styled.div`
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  min-height: 100px;
  margin: auto;
  margin-bottom: 20px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;

  div:first-child {
    width: 120px;
    background-color: #c4c4c4;
    border-radius: 10px;
    display: flex;
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
      margin: auto;
    }
  }

  div:last-child {
    width: 300px;
    font-size: 20px;
    font-weight: 600;
    margin: auto;
  }
`;

export const SpotImage = styled.div`
  margin-right: 10px;
  img {
    width: 100px;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
export const SpotInfos = styled.div`
  width: 300px;
  margin-right: 10px;
  margin-bottom: 5px;

  div:first-child {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const SpotIcons = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 30px;
  }

  div:last-child {
    cursor: pointer;
    img {
      width: 5px;
      display: flex;
      float: right;
      margin-bottom: 10px;
    }
  }
  background-color: transparent;
  margin-bottom: 10px;
  /* border: 1px solid #1746c7; */
  border-radius: 10px;
`;

export const SpotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 350px; */
  margin-bottom: 20px;
  margin-right: 10px;
  button {
    color: #000;
  }
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
      font-size: 20px;
      font-weight: bold;
      background-color: transparent;
      border: none;
    }
    p {
      margin: 5px;
    }
    span {
      margin-left: 6px;
    }

    span:last-child {
      margin-left: 0px;
      color: #49e7a5;
      padding: 1px 6px;
      text-align: center;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 700;
      background-color: black;
      position: relative;
      z-index: 2;
      top: 1px;
      left: 8px;
    }
  }
`;

export const HostCard = styled.div`
  margin-top: 20px;
`;
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
      /* width: 100%; */
      /* margin: 0 auto; */
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

export const ReservedSpot = styled.div`
  div {
    img {
      width: 90%;
      border-radius: 15px;
    }
  }
`;
export const MyMatchList = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 10px;
`;
export const AboutMatch = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;
export const CompletedMath = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
  }
  div {
    img {
      width: 90%;
      border-radius: 15px;
    }
  }
`;

export const WaitedMatch = styled.div`
  margin-top: 20px;
  span {
    font-size: 16px;
    font-weight: 600;
  }
  hr {
    border: none;
    border-top: 1px dashed #1746c7;
    color: #1746c7;
    background-color: transparent;
    height: 1px;
    width: 100%;
  }
  div {
    img {
      width: 90%;
      border-radius: 15px;
    }
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
  max-width: 400px;
  margin: auto;
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
  margin-left: 60px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
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
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  margin: 20px 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
    border: 2px solid #1746c7;
  }
`;
export const CancleBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  text-align: center;
  margin: 0px 15px 15px auto;
  font-size: 14px;
  padding: 1px 12px;
  height: 38px;
  font-weight: bold;
  color: white;
  background-color: #ff00b4;
  border: none;
  border-radius: 20px;
`;

export const ProfilePhotoInput = styled.input`
  /* width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0; */
  display: none;
`;

export const ProfilePhotoUpload = styled.div`
  div {
    background-color: #fff;
    border: 2px solid #00f78e;
    font-size: 30px;
    font-weight: 800;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 170px;
    left: 55%;
  }
`;

export const SaveImage = styled.button`
  background-color: #ff00b4;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: auto;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const ModifyDiv = styled.div`
  margin: auto;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const ModifyBlock = styled.div`
  display: flex;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid #cecece;

  div:first-child {
    margin-top: 5px;
    width: 70px;
    padding-right: 10px;
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
  }

  input {
    margin-left: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 5px;
    width: 150px;
    margin-bottom: 5px;
    :focus {
      outline: none;
    }
  }

  button {
    margin-top: 5px;
    border: none;
    background-color: #fff;
    color: black;
    font-weight: 600;
    width: 60px;
  }
`;

export const ModifyBtns = styled.div`
  display: flex;
  margin: auto;
  margin-top: 40px;

  button {
    background-color: #1746c7;
    width: 160px;
    height: 40px;
    border-radius: 20px;
    border: none;
    margin: auto;
    color: #fff;
    font-weight: 600;
    margin-left: 10px;
    cursor: pointer;
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
export const WaitForMatch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  margin: 20px 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
    border: 2px solid #1746c7;
  }
`;
export const MatchVS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 5px auto 15px auto;
  div {
    width: 33%;
    text-align: center;
    font-weight: bold;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
      border: 2px solid #1746c7;
    }
  }
`;
export const TeamInfoDetail = styled.div`
  background-color: #f5f5f5;
  width: 50px;
  /* height: 80px; */
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  div {
    width: 100%;
    margin-top: 10px;
  }
  span {
    font-size: 12px;
    font-weight: normal;
  }
`;
export const VS = styled(MatchVS)`
  font-size: 30px;
`;
export const MidTitle = styled.div`
  margin: 20px auto 0px 20px;
  font-weight: bold;
  span {
    font-weight: normal;
    margin-left: 5px;
    font-size: 14px;
  }
`;
export const OneOrTwo = styled.div`
  margin: 5px auto 10px 20px;
`;
export const WaitTeam = styled(MatchVS)`
  img:last-child {
    border: none;
    border-radius: 10px;
    width: 80px;
    height: 90px;
  }
`;
