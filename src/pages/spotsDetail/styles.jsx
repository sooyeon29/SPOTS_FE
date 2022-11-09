import styled from "styled-components";

export const Wrap = styled.div`
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
export const Team = styled.button`
  width: 80px;
  height: 50px;
  border: 1px solid black;
`;
export const BookingBut = styled.button``;
