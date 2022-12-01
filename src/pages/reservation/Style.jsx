import styled from 'styled-components';

export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-bottom: 0;
  margin: auto;
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
  margin: 10px 0px 0px 0px;

  div {
    margin-top: 7px;
  }
`;

export const PlaceList = styled.div`
  width: 100%;
  display: flex;
  /* margin-top: 10px; */
  flex-direction: column;
  height: 80vh;
  overflow: scroll;
  background-color: #FFF;
  display: flex;
  margin-bottom: 80px;
  padding-bottom: 20px;
  border-radius: 30px;
  position: absolute;
  top: 50%;
  z-index: 3;
  
`;

export const ListBar = styled.div`
  margin:auto;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 100px;
  height: 10px;
  border: 2px solid #C4C4C4;
  border-radius: 10px;
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
    border-radius: 23px;
    :focus {
      background-color: #2b2bff;
      color: white;
    }
  }
  z-index: 2;
  top: 15%;
  right: 16%;
  position: absolute;
`;

export const Container = styled.div`
  background-color: #fff;
  width: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #49e7a5;
  border: solid 2px white;
`;

export const Status = styled.span`
  font-weight: 600;
  color: #2b2bff;
  margin-bottom: 5px;
`;

export const PrivateBlock = styled.div`
  display: flex;
  margin: auto;
  margin-top: 10px;
  /* margin-bottom: 10px; */
  border-radius: 10px;
  padding: 15px;
  /* padding-left: 15px; */
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
    width: 43px;
    height: 50px;
    margin-right: 15px;
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
  padding: 15px;
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
    width: 43px;
    height: 50px;
    margin-right: 15px;
  }
  p {
    margin: auto;
  }
  span {
    display: flex;
    justify-content: space-between;
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
  /* margin: auto; */
`;

export const StSearch = styled.div`
  background-color: #f1f1f1;
  width: 90%;
  height: 40px;
  display: flex;
  margin: auto;
  margin-top: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const SearchInput = styled.input`
  border: none;
  /* width: 100%; */
  background-color: transparent;
  :focus {
    outline: none;
  }
  padding: 5px;
`;

export const PublicReserve = styled.a`
  text-decoration: none;
  color: black;
`;
