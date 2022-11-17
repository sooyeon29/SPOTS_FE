import styled from "styled-components";

export const UpperLine = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px 10px 10px 10px;

  button {
    width: auto;
    height: 30px;
    margin-right: 10px;
    border-radius: 20px;
    padding: 0px 10px 0px 10px;
    border: 2px solid black;
    cursor: pointer;
  }

  span {
    margin-left: 10px;
  }

  span:first-child {
    color: #2b2bff;
  }

  span:last-child {
    color: #ff00b3;
  }
`;

export const SearchBox = styled.form`
  margin: 30px;
`;

export const Container = styled.div`
  background-color: #fff;
  width: auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #d5f103;
  border: solid 2px white;
`;
export const Title = styled.div``;

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
  top: 43%;
  right: 40%;
  position: absolute;
`;
