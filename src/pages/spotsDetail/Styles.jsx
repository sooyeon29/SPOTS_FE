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

export const BookMatch = styled.div`
  display: flex;
`;
export const Time = styled.div`
  width: 40%;
`;
export const Team = styled.button`
  width: 80px;
  height: 50px;
  border: 1px solid black;
  background-color: ${(props) => (props.butcolor ? "pink" : "lightgray")};
`;
export const Select = styled.div`
  display: flex;
`;
export const SelectTeam = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
`;
export const YourSelect = styled.div`
  padding: 10px;
  div {
    display: flex;
  }
`;
export const BookingBut = styled.button``;
export const Pick = styled.div`
  display: flex;
  height: 38px;
  justify-content: center;
  /* position: relative; */
  z-index: 1;
  width: 90%;
  /* height: 100%; */
  background-color: #f8f9fd;
  border: 1px solid #f1f3f7;
  /* padding: 0px; */
  border-radius: 8px;
  /* box-sizing: border-box; */
  margin: 28px auto 20px auto;
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
