import styled from "styled-components";

//HostDetail
export const SpotsWrap = styled.div`
  width: 330px;
  margin: auto;
  margin-top: 70px;
`;

export const SpotImg = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const SpotIcon = styled.div`
  img {
    width: 40px;
  }
`;

export const SpotsLayout = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div:first-child {
    width: 40px;
    text-align: center;
    color: #545454;
    margin-right: 30px;
  }

  input {
    border-radius: 5px;
    height: 20px;
    border: 1px solid gray;
    margin-right: 5px;
  }

  textarea {
    border-radius: 10px;
    padding: 5px;
  }
`;

export const SpotKind = styled.span`
  background-color: #1746c7;
  color: #fff;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
`;

export const SpotsComforts = styled.span`
  background-color: #1746c7;
  color: #fff;
  padding: 3px 5px 3px 5px;
  border-radius: 10px;
  margin-right: 5px;
  word-break: keep-all;
`;

export const SpotsBtns = styled.div`
  display: flex;

  button {
    display: flex;
    width: 45%;
    height: 40px;
    border: none;
    background-color: #1746c7;
    border-radius: 20px;
    color: #fff;
    margin: auto;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 70px;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const ComfortsLayout = styled.div`
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div {
    width: 230px;
  }

  p:first-child {
    margin-left: 12px;
    width: 40px;
    text-align: center;
    color: #545454;
    margin-right: 30px;
  }
`;

export const StTeam = styled.div`
  width: 100%;
  margin: auto;
`;

//Hosting
export const StWrap = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

export const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
`;

export const HostingPhotoUpload = styled.div`
  img {
    width: 20px;
    position: absolute;
  }
`;

export const HostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const InputLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div:first-child {
    width: 60px;
    text-align: center;
    color: #545454;
    margin-right: 30px;
  }
`;

export const SaveBtn = styled.button`
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
  margin-top: 30px;
`;

export const InputText = styled.input`
  display: flex;
  border: none;
  width: 150px;
  :focus {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  border: none;
  height: 25px;
  width: 40px;
  border-radius: 5px;
  color: #000;
`;

export const Preview = styled.div`
  div:first-child {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;
    border-radius: 10px;
  }
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

export const HostPreview = styled.div`
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const SpotsLabel = styled.label`
  margin-right: 5px;
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

export const FootballDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/football_gray.png");
  background-size: 60px;

  ${FootballInput}:checked + && {
    background-image: url("/mypage/football_blue.png");
    background-size: 60px;
  }

  img {
    width: 60px;
    height: 60px;
  }
`;

export const TennisDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/tennis_gray.png");
  background-size: 60px;

  ${TennisInput}:checked + && {
    background-image: url("/mypage/tennis_blue.png");
    background-size: 60px;
  }
`;

export const BadmintonDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/badminton_gray.png");
  background-size: 60px;

  ${BadmintonInput}:checked + && {
    background-image: url("/mypage/badminton_blue.png");
    background-size: 60px;
  }
`;

export const KindLabel = styled.label``;

export const OutdoorInput = styled.input`
  display: none;
`;

export const IndoorInput = styled.input`
  display: none;
`;

export const IndoorDiv = styled.div`
  width: 95px;
  height: 25px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  ${IndoorInput}:checked + && {
    background-color: #1746c7;
    color: #fff;
  }
`;

export const OutdoorDiv = styled.div`
  width: 95px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  ${OutdoorInput}:checked + && {
    background-color: #1746c7;
    color: #fff;
  }
`;

export const ComfortsWrap = styled.div`
  display: flex;
  width: 180px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const ComfortsLabel = styled.label`
  margin-right: 5px;
`;

export const LentalInput = styled.input`
  display: none;
`;

export const LockerInput = styled.input`
  display: none;
`;

export const ParkingInput = styled.input`
  display: none;
`;

export const ShowerInput = styled.input`
  display: none;
`;

export const DressInput = styled.input`
  display: none;
`;

export const LentalDiv = styled.div`
  background-color: #d9d9d9;
  width: 60px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;
  color: #000;

  ${LentalInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const LockerDiv = styled.div`
  background-color: #d9d9d9;
  width: 60px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;
  color: #000;

  ${LockerInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const ParkingDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${ParkingInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const ShowerDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${ShowerInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const DressDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${DressInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const TextArea = styled.textarea`
  margin-top: 20px;
  resize: none;
  padding: 10px;

  :focus {
    outline: none;
  }
`;

export const HostCard = styled.div`
  margin-top: 20px;
`;

export const ProfilePhotoInput = styled.input`
  display: none;
`;

//HostList
export const MyMatch = styled.div`
  background-color: #f1f1f1;
  display: flex;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: -1px 3px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export const StWrapHostList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 100px;
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
  border-radius: 10px;
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
