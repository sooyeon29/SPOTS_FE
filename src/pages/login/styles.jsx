import styled from 'styled-components';

export const StWraps = styled.div`
  > h1 {
    font-weight: bold;
  }

  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Stinput = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0 30px 0;
  width: 100%;
  min-width: 300px;
  font-family: 'MonoplexKR-Regular';
`;
