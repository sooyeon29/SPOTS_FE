import styled from "styled-components";
export const WrapAll = styled.div`
  margin: 71px auto;
`;

export const Sports = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-weight: 700;
  font-size: 16px;
`;
export const SpotPhoto = styled.div`
  width: 95%;
  max-width: 800px;
  padding: 0px;
  overflow: hidden;
  /* background-color: lightcyan; */
  border-radius: 10px;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 10px;
    margin: auto;
  }
`;
export const PlaceInfo = styled.div`
  margin-top: 10px;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 85%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  div {
    margin-top: 5px;
  }
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  li {
    margin-top: 10px;
    font-weight: bold;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
export const Calen = styled.div`
  margin: 5px;

  div {
    background-color: white;
    color: black;
    padding: 6px;
    border-radius: 10px;
    font-size: 17px;

    button {
      margin-top: 18px;
      cursor: pointer;
    }
  }
`;
export const SelectDone = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 85%;
  height: 40px;
  font-weight: bold;
  max-width: 800px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  background-color: #1646c7;
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const SelectDone2 = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 85%;
  height: 40px;
  font-weight: bold;
  max-width: 800px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  background-color: #eaeffc;
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: #1646c7;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const ExitBut = styled.button`
  cursor: pointer;
  width: 10%;
`;
export const CalTime = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 95%;
  max-width: 800px;
  padding: 10px 0px;
  margin-bottom: 10px;
  p {
    margin-left: 20px;
  }
  span {
    margin-left: 20px;
    font-weight: bold;
  }
`;
export const Times = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    /* color: ${(props) => (props.butColor ? "auto" : "red")}; */
    cursor: pointer;
    background: #ffffff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    border: #d9d9d9;
    border-radius: 8px;
    margin-bottom: 6px;
    width: 100%;
    height: 44px;
    font-weight: 400;
    font-size: 15px;
    &:hover {
      background: #d9d9d9;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;
export const SelectChoice = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

export const TeamSelect = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 60%;
  height: 50px;
  max-width: 800px;
  padding: 10px 10px;
  font-size: 15px;
  margin-left: 10px;
`;

export const Counter = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: center;
  align-items: center;
  margin: 0px 20px;
  button {
    width: 25px;
    height: 25px;
    background: #d9d9d9;
    border: #d9d9d9;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  span {
    margin: 0px 20px;
    font-size: 18px;
  }
`;

export const FindMatch = styled.button`
  background: #d9d9d9;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border: #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0px;
  padding: 10px;
`;

export const Wrap = styled.div`
  border: 1px solid black;
  margin-top: 10px;
  padding: 0px 20px 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const SpotInfo = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  padding: 10px;
  /* height: 400px; */
  span {
    font-size: 10px;
    margin: 7px auto 7px 0px;
  }
  p {
    font-size: 10px;
    margin: 0px;
  }
  h5 {
    margin: 7px auto 0px 3px;
  }
`;

export const TimeDate = styled.div`
  /* display: flex; */
  width: 100%;
  padding: 10px;
`;
export const SelectList = styled.div`
  /* width: 55%; */
  span {
    font-size: 12px;
    margin-left: 5px;
    font-weight: bold;
  }
`;

export const SelectTeam = styled.div`
  flex-direction: column;
  width: 100%;
`;
export const BookMatch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const Time = styled.div`
  margin-top: 12px;
  margin-left: 20px;
  /* width: 100%; */
`;
export const Team = styled.button`
  background: #ffffff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border: #d9d9d9;
  border-radius: 8px;
  margin-left: 10px;
  margin-bottom: 6px;
  width: 100px;
  height: 44px;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background: #d9d9d9;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const YourSelect = styled.div`
  margin: auto;
  padding: 30px;

  div {
    display: flex;
  }
  select {
    margin: 10px;
  }
  input {
    margin: 10px;
  }
`;
export const ShowDateTime = styled.div`
  width: 90%;
  border: 1px solid black;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const NoMatchBook = styled.button`
  margin: 10px auto;
  cursor: pointer;
`;
export const BookingBut = styled.button`
  cursor: pointer;
`;
export const Pick = styled.div`
  display: flex;
  height: 38px;
  justify-content: center;
  z-index: 1;
  width: 90%;
  background-color: #f8f9fd;
  border: 1px solid #f1f3f7;
  border-radius: 8px;
  margin: 10px auto 20px auto;
`;
export const One = styled.button`
  z-index: 2;
  width: 50%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px #e9ebec;
  border-radius: 7px;
  border: 0px;
  /* margin-right: 3%; */
  cursor: pointer;
  &:hover {
    background: #d9d9d9;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  }
`;
export const Two = styled.button`
  width: 50%;
  height: 100%;
  text-align: center;
  align-items: center;
  cursor: pointer;
  border: 0px;
`;
export const FinalBooking = styled.button`
  display: flex;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  /* z-index: 1; */
  width: 95%;
  background-color: #bcbcbc;
  border: 1px solid #f1f3f7;
  border-radius: 8px;
  margin: 10px auto 20px auto;
  cursor: pointer;
`;
export const MakeMatch = styled.div`
  display: flex;
  flex-direction: row;
`;
export const GoMatch = styled.div`
  button {
    height: 95%;
    margin: 10px;
  }
`;
export const WaitingMatch = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: fit-content;
`;
