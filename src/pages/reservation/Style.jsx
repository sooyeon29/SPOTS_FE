import styled from 'styled-components';

export const HostSpots = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  /* justify-content: center; */
  /* align-items: center; */
  width: 80%;
`;
export const MapPlace = styled.div`
  width: 50%;
  /* background-color: lightsalmon; */
  height: 80vh;
`;

export const PlaceList = styled.div`
  /* position: relative; */
  display: flex;
  flex: 1;
  flex-direction: column;
  /* width: 50%; */
  height: 80vh;
  overflow: scroll;
`;

export const Place = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const BtnWrap = styled.div`
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
  background-color: aliceblue;
  margin: 40px 10px 10px 10px;
  display: block;

  span {
    width: auto;
    margin-left: 10px;
    display: inline-block;
    text-align: right;
  }
`;

export const ListBox = styled.div`
  width: 50%;

`;

export const PrivateBlock = styled.div`
  cursor: pointer;
`