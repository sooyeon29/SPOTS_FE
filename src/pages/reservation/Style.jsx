import styled from "styled-components";

export const StWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* justify-content: center; */
  /* align-items: center; */
  width: 80%;
`;
export const MapPlace = styled.div`
  width: 50%;
  height: 80vh;
  margin-top: 70px;
`;

export const PlaceList = styled.div`
  width: 50%;
  display: flex;
  margin-top: 70px;
  flex-direction: column;
  height: 80vh;
  overflow: scroll;
  background-color: #f1f1f1;
  display: flex;
`;

export const Place = styled.div`
  /* border: 2px solid #FF00B3; */
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 90%;
  background-color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

export const BtnWrap = styled.div`
  border: none;
  border-radius: 30px;
  background-color: white;
  width: 330px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

  button {
    width: 90px;
    height: 30px;
    margin: auto;
    border: none;
    cursor: pointer;
    border-radius: 23px;
    :focus {
      background-color: #2b2bff;
      color: white;
    }
  }
  z-index: 2;
  top: 20%;
  right: 59%;
  position: absolute;
`;

export const Container = styled.div`
  background-color: #fff;
  width: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #d5f103;
  border: solid 2px white;
`;

export const Status = styled.div`
  /* background-color: black; */
  margin: 40px 10px 10px 10px;
  display: block;

  /* span {
    width: auto;
    margin-left: 10px;
    display: inline-block;
    text-align: right;
  } */
`;

export const PrivateBlock = styled.div`
  cursor: pointer;
`;

export const PublicBlock = styled.div`
  cursor: pointer;
`;
