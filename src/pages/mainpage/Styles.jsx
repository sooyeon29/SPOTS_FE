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
    color: #2B2BFF;
  }

  span:last-child {
    color: #FF00B3;
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
