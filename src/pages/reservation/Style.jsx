import styled from 'styled-components';

export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
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
  margin:10px 0px 0px 0px;

  div {
    margin-top: 7px;
  }

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
  margin-bottom: 80px;
  padding-bottom: 20px;
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
  top: 11.5%;
  right: 16%;
  position: absolute;
`;

export const Container = styled.div`
  background-color: #fff;
  width: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #49E7A5;
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
    width: 45px;
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
    width: 45px;
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
  margin-top: 70px;
  background-color: #f1f1f1;
  width: 350px;
  height: 40px;
  display: flex;
  margin: auto;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  border: none;
  width: 300px;
  background-color: transparent;
  :focus {
    outline: none;
  }
  padding: 5px;
`;

export const PublicReserve = styled.a`
  text-decoration: none;
  color:black;
`