import styled from "styled-components";

export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-bottom: 0;

  img {
    width: 30px;
    height: 30px;
  }
`;
export const MapPlace = styled.div`
  width: 100%;
  height: 100%;
`;
export const Index = styled.div`
  display: flex;
  justify-content: row;
  margin-top: 10px;
`;
export const PlaceList = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  height: 80vh;
  overflow: scroll;
  background-color: #f1f1f1;
  display: flex;
`;

export const BtnWrap = styled.div`
  border: none;
  border-radius: 30px;
  background-color: white;
  width: 330px;
  height: 50px;
  display: flex;
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
  top: 12%;
  right: 7%;
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
  display: flex;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 90%;
  background-color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
  p {
    margin: auto;
  }
`;

export const PublicBlock = styled.div`
  display: flex;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 5px 10px 5px;
  width: 90%;
  background-color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
  p {
    margin: auto;
  }
  span {
    display: flex;
    justify-content: space-between;
  }
`;
