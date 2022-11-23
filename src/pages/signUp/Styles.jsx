import styled from 'styled-components';

export const Red = styled.span`
  color: red;
`;

export const phonNum = styled.div`
  width: auto;
  cursor: pointer;
  color: #ff00b3;
  font-weight: 600;
  background-color: white;
  width: 80px;
  height: 40px;
  border: none;
`;

export const StWrap = styled.div`
  margin-top: 200px;
  background-color: #f1f1f1;
  padding: 30px;
`;

export const PageTitle = styled.div`
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: 700;
  align-items: left;
`;

export const IdInput = styled.input`
  border: none;
  width: 220px;
  padding: 12px 15px;
  margin-bottom: 10px;
  /* margin-bottom: 10px; */
  /* background-color: aliceblue; */
  :focus {
    outline: none;
  }
`;

export const PwInput = styled.input`
  border: none;
  width: 300px;
  padding: 12px 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  :focus {
    outline: none;
  }
`;

export const ContentWrap = styled.div`
  /* justify-content: center;
align-items: center; */
  text-align: center;
  /* margin: auto; */
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const FirstPage = styled.div`
  div {
  }
  input {
  }
`;
export const IdConfirmBtn = styled.button`
  /* margin-right: -68px; */
  /* margin-left: 10px; */
  width: auto;
  cursor: pointer;
  color: #ff00b3;
  font-weight: 600;
  background-color: white;
  width: 80px;
  height: 40px;
  border: none;
  /* border-bottom: 2px solid #ff00b3; */
`;

export const NextBtn = styled.button`
  border: none;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 40px;
  background: #2b2bff;
  color: white;
  border-radius: 5px;
  width: 330px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
`;

export const SecondPage = styled.div`
  input {
    border: none;
    width: 240px;
    padding: 12px 15px;
    margin-bottom: 10px;
    /* margin-bottom: 10px; */
    /* background-color: aliceblue; */
    :focus {
      outline: none;
    }
  }
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const ThirdPage = styled.div`
  input {
    border: none;
    width: 240px;
    padding: 12px 15px;
    margin-bottom: 10px;
    /* margin-bottom: 10px; */
    /* background-color: aliceblue; */
    :focus {
      outline: none;
    }
  }
  p {
    /* background-color: aliceblue; */
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;

export const GenderSelect = styled.div`
  /* display: flex; */
  /* background-color: black; */
`;

export const ForthPage = styled.div`
  margin: auto;
  /* display: flex; */
`;
export const MySports = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  /* background-color: aliceblue; */
`;

export const SportInput = styled.input`
display: none
`;

export const SportLabel = styled.label`
gap: 20px;
`;

export const SportDiv = styled.div`
  background-color: #fff;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #303030;
  border: 1.5px solid transparent;
  box-shadow: 0px 5px 20px 2px rgba(0,0,0,0.1);
  font-size: 12px;
  

  ${SportInput}:checked + && {
    color: #ff00b3;
    border-color: #ff00b3;
  }
`;

export const FavSports = styled.div`
font-size: 14px;
`;

export const SportsBlock = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const RecommendId = styled.input`
  border: none;
  width: 220px;
  padding: 12px 15px;
  margin-bottom: 10px;
  margin-top: 20px;
  /* margin-bottom: 10px; */
  /* background-color: aliceblue; */
  :focus {
    outline: none;
  }
`;
