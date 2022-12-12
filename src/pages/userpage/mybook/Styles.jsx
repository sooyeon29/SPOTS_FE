import styled from "styled-components";

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
`;

export const CompletedMath = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const ReservedSpot = styled.div``;

export const MyReserve = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 80px;
  margin-bottom: 72px;
  align-items: center;
`;

export const AboutMatch = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
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
  margin: 10px 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
    border: 2px solid #1746c7;
  }
`;

export const SpotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
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

export const MidTitle = styled.div`
  margin: 20px auto 0px 20px;
  font-weight: bold;
  span {
    font-weight: normal;
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const MyMatch2 = styled.div`
  background-color: transparent;
  margin-bottom: 10px;
  border: 1px solid #1746c7;
  border-radius: 11px;
`;

export const VS = styled(MatchVS)`
  font-size: 30px;
`;

export const TeamInfoDetail = styled.div`
  background-color: #f5f5f5;
  width: 50px;
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

export const WaitTeam = styled(MatchVS)`
  img:last-child {
    border: none;
    border-radius: 10px;
    width: 80px;
    height: 90px;
  }
`;

export const NoBookNow = styled.img`
  width: 100%;
  border-radius: 18px;
`;
