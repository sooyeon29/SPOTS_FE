import styled from "styled-components";

export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-bottom: 0;
  margin: auto;
  img {
    /* width: 30px; */
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
  margin: 10px 0px 0px 0px;

  div {
    margin-top: 7px;
  }
`;

export const PlaceList = styled.div`
  max-width: 390px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: ${({ open }) => (open ? "88vh" : "44vh")};
  background-color: #fff;
  display: flex;
  margin-bottom: 80px;
  padding-bottom: 50px;
  border-radius: 30px;
  position: absolute;
  top: ${({ open }) => (open ? "17%" : "50%")};
  z-index: 3;
  box-shadow: 0px -2px 11px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: 0.8s ease;
`;

export const ListBar = styled.div`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100px;
  height: 0.1px;
  border: 2px solid #c4c4c4;
  border-radius: 10px;
`;

export const Lists = styled.div`
  overflow: scroll;
  margin-bottom: 20px;
  //
`;
export const BtnWrap = styled.div`
  border: none;
  border-radius: 30px;
  background-color: white;
  width: 280px;
  height: 45px;
  display: flex;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

  button {
    width: 80px;
    height: 30px;
    margin: auto;
    border: none;
    cursor: pointer;
    color: #000;
    border-radius: 23px;
    :focus {
      background-color: #2b2bff;
      color: white;
    }
  }
  z-index: 2;
  top: 120px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

export const Container = styled.div`
  width: auto;
  padding: 7px;
  border-radius: 10px;
  background-color: #fff;
  border: solid 2px transparent;
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));

  div:first-child {
    font-weight: 600;
  }
  div:last-child {
    font-size: 14px;
    cursor: pointer;
    color: gray;
  }
  a {
    color: gray;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const Status = styled.span`
  font-weight: 600;
  color: #2b2bff;
`;

export const PrivateBlock = styled.div`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 15px;
  width: 85%;
  background-color: #fff;
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
  img {
    /* width: 60px;
    height: 23px; */
  }
  p:first-child {
    margin: auto;
    margin-top: 5px;
    font-size: 18px;
    font-weight: 700;
  }
  p:last-child {
    margin: auto;
    font-size: 14px;
    color: #545454;
  }
`;

export const UpperLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  span {
    color: #e938ae;
  }
`;

export const LowerLine = styled.div`
  display: flex;
  justify-content: flex;
  justify-content: space-between;
  font-size: 14px;
  span {
    color: #1746c7;
  }
`;
export const PublicBlock = styled.div`
  /* display: flex; */
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 15px;
  width: 85%;
  background-color: #fff;
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
  img {
    /* width: 100%; */
  }
`;

export const PublicInfo = styled.div`
  margin-top: 5px;
  p {
    margin: auto;
    font-size: 14px;
    color: #545454;
  }
  span:first-child {
    /* background-color: blue; */
    font-size: 18px;
    font-weight: 700;
    margin-right: 5px;
  }
`;

export const MylocationBtn = styled.button`
  position: absolute;
  width: 146px;
  height: 40px;
  left: 117px;
  top: 420px;
  border: none;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
  z-index: 999;
  cursor: pointer;
`;

export const SearchTerm = styled.div`
  margin: auto;
`;

export const StSearch = styled.div`
  background-color: #f1f1f1;
  width: 90%;
  height: 40px;
  display: flex;
  margin: auto;
  margin-top: 70px;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 8px;
`;

export const SearchInput = styled.input`
  border: none;
  width: 300px;
  background-color: transparent;

  ::placeholder {
    padding-left: 5px;
  }
  :focus {
    outline: none;
  }
  padding: 5px;
`;

export const PublicReserve = styled.a`
  text-decoration: none;
  color: black;
`;

export const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  font-size: 15px;
  color: #1746c7;
  font-weight: 600;
  p {
    margin: 0px;
  }
`;
