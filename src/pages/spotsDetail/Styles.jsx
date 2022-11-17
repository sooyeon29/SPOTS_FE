import styled from "styled-components";

export const Wrap = styled.div`
  width: 90%;
  border: 1px solid black;
  margin-top: 30px;
  padding: 0px 20px 0px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  margin: 0px;
  padding: 10px;
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const SpotPhoto = styled.div`
  width: 55%;
  padding: 0px;
  overflow: hidden;
  background-color: lightcyan;
  img {
    width: 100%;
    height: 250px;
    object-fit: contain;
    margin: auto;
  }
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
export const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    span {
      font-size: 10px;
    }
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
export const CalTime = styled.div`
  display: flex;
  padding: 5px;
  width: 100%;
  div {
    /* width: 50%; */
    div {
      margin: auto;
      background-color: white;
      color: black;
    }
  }
`;
export const Times = styled.div`
  display: flex;
  flex-direction: column;
  width: 170%;
  justify-content: center;
  align-items: center;
  button {
    background: #f5f5f5;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    border: #d9d9d9;
    border-radius: 8px;
    margin-bottom: 3px;
    height: 22px;
    width: 120px;
    &:hover {
      background: #d9d9d9;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;
export const FindMatch = styled.button`
  display: flex;
  justify-content: center;
  margin: 0px auto 10px auto;
  width: 98%;
  background: #d9d9d9;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border: #d9d9d9;
  border-radius: 8px;
`;
export const SelectTeam = styled.div`
  flex-direction: column;
  width: 100%;
`;
export const BookMatch = styled.div`
  display: flex;
  width: 100%;
`;
export const Time = styled.div`
  /* width: 100%; */
`;
export const Team = styled.button`
  width: 100px;
  height: 27px;
  margin: 0px auto 3px auto;
  background: #f5f5f5;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: #bcbcbc;
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
export const Line = styled.div`
  width: 98%;
  height: 1px;
  background-color: black;
  margin: 5px auto;
`;
export const NoMatchBook = styled.button`
  margin: 10px auto;
`;
export const BookingBut = styled.button``;
export const Pick = styled.div`
  display: flex;
  height: 38px;
  justify-content: center;
  z-index: 1;
  width: 90%;
  background-color: #f8f9fd;
  border: 1px solid #f1f3f7;
  border-radius: 8px;
  margin: 40px auto 20px auto;
`;
export const One = styled.button`
  z-index: 2;
  width: 50%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px #e9ebec;
  border-radius: 7px;
  border: 0px;
`;
export const Two = styled.button`
  width: 50%;
  height: 100%;
  text-align: center;
  align-items: center;
  cursor: pointer;
  border: 0px;
`;
