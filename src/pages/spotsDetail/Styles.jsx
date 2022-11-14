import styled from "styled-components";

export const Wrap = styled.div`
  width: 90%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const MainInfo = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Title = styled.div`
  background-color: beige;
  font-size: 20px;
  font-weight: bold;
`;
export const Croll = styled.div`
  display: flex;

  img {
    width: 100px;
    height: 50px;
    background-color: lightcoral;
  }
  div {
    background-color: lightblue;
  }
`;

export const TimeDate = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`;
export const SelectList = styled.div`
  width: 50%;
`;
export const CalTime = styled.div`
  display: flex;
  /* padding: 0px; */
`;
export const Times = styled(TimeDate)`
  display: flex;
  flex-direction: column;
  width: 150%;
  padding: 10px;
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
  width: 200px;
  height: 50px;
  border: 1px solid black;
`;

export const YourSelect = styled.div`
  margin: auto;
  padding: 30px;
  width: 50%;
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
  width: 300px;
  height: 1px;
  background-color: black;
  margin: 20px 0px;
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
