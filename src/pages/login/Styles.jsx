import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const StWraps = styled.div`
  margin-top: 200px;
  background-color: #f1f1f1;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* flex-direction: column; */
  padding: 30px;
  /* height: 320px; */
  /* text-align: center; */
`;

export const PageTitle = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: 700;
  align-items: left;
  
`;

export const LoginBtn = styled.button`
  height: 50px;
  /* padding: 11px 0px 10px; */
  background: #2b2bff;
  color: white;
  display: flex;
  /* text-align: center; */
  align-items: center;
  justify-content: center;
  width: 330px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    /* background-color: ${darken(0.1, '#8fc7ff')}; */
  }
`;

export const InputWrap = styled.div`
  /* border: 2px solid black; */
  width: 330px;
  margin: auto;
`

export const Stinput = styled.input`
  background-color: #fff;
  border: none;
  padding: 12px 15px;
  width: 300px;
  margin: auto;
  margin-bottom: 10px;
  /* margin: 8px 0 30px 0; */
  /* width: 100%; */
  /* min-width: 300px; */
  font-family: 'MonoplexKR-Regular';
`;

export const FindButs = styled.div`
  width: 330px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-around;
  /* background-color: lightcyan; */
  button {
    /* background-color: blue; */
    /* width: 100px; */
    background-color: transparent;
    border: none;
    font-size: 14px;
    /* font-weight: bold; */
  }
`;

export const KakaoBtn = styled.button`
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 50px;
  /* padding: 11px 0px 10px; */
  background: #f7e600;
  width: 330px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 10px;

  a {
    text-decoration: none;
    color: #3a1d1d;
  }
  &:hover {
    /* background-color: ${lighten(0.1, '#ffcd2a')}; */
  }
  img {
    margin: auto 2px;
  }
`;

export const PwInput = styled.div`
  button {
    border: none;
    background-color: #fff;
    height: 40px;
    margin-top: 1px;
    cursor: pointer;
  }
`;
