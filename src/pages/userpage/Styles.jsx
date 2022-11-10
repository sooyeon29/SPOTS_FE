import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StWrap = styled.div`
  width: 50%;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 15px;
`;

export const StTag = styled.button`
  width: 20%;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 15px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;

export const StTeam = styled.div`
  width: 40%;
  height: 80px;
  border: 1px solid lightgray;
  border-radius: 15px;
`;

export const StTeamForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
