import styled, { css } from "styled-components";

export const StContainer = styled.div`
  display: flex;
`;

export const StWrap = styled.div``;

export const ChatBox = styled.div`
  width: 350px;
  height: 400px;
  border: 1px solid lightgray;
  overflow: scroll;
`;

export const RoomForm = styled.form`
  width: 350px;
  height: 130px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const RoomInput = styled.input`
  width: 330px;
  height: 20px;
  margin: -20px auto 0 auto;
  border: 1px solid lightgray;
`;

export const RoomBtn = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: #3a6dfa;
  border: none;
  border-radius: 6px;
  margin: 10px 0 0 8px;
  cursor: pointer;
`;

export const RoomStContainer = styled.div`
  bottom: 50px;
  position: fixed;
  z-index: 9999;
  visibility: hidden;
  transition: 0.8s ease;
  opacity: 0;
  width: 100%;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

export const StBox = styled.div`
  /* @media screen and (min-width: 600px) {
    width: 600px;
    height: 500px;
  } */
  max-width: 420px;
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  border: 1px solid lightgray;
  background-color: #f8f8f8;
`;

export const StHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 23px;
  img {
    width: 30px;
    height: 55px;
    border-radius: 45px;
  }
  div {
    font-size: 24px;
    margin: 7px 0 0 20px;
    font-weight: 700;
  }
  button {
    /* @media screen and (min-width: 600px) {
      margin-left: 400px;
    } */
    border: none;
    background-color: transparent;
    margin: 3px 0 0 190px;
    cursor: pointer;
  }
`;

export const StContent = styled.div`
  height: 90px;
  margin: 15px 0 0 23px;
  font-size: 18px;
  color: #00000066;
  font-weight: 500;
  p {
    margin-top: 4px;
  }
`;

export const StChat = styled.div`
  @media screen and (min-width: 600px) {
    margin: -10px auto 0 auto;
  }
  margin: 0;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 35px;
  border: 1px solid lightgray;
  box-shadow: 15px 10px 30px #efeff0;
`;

export const StChatContent = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 20px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 45px;
  }
  div {
    margin: 10px;
  }
  p {
    margin: 1px;
    font-size: 18px;
  }
`;

export const Button = styled.button`
  width: 370px;
  height: 60px;
  margin: auto;
  border-radius: 20px;
  border: none;
  font-size: 19px;
  cursor: pointer;
  background-color: #0000000d;
  :hover {
    background-color: #00000014;
  }
`;

export const ChattingStWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChattingStHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  div {
    font-size: 19px;
    font-weight: 700;
    margin-left: 30px;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 10px 0 10px;
  }
`;

export const ChattingChatBox = styled.div`
  height: 690px;
  overflow-y: scroll;
  border: none;
  margin: 10px 10px 0 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const StForm = styled.form`
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  background-color: #0000000d;
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 10px 0 10px;
  }
  //bottom: -30px;
`;

export const StInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px;
  padding-left: 10px;
`;

export const StAdmin = styled.div`
  img {
    width: 30px;
    height: 30px;
  }
`;

export const StAdminMsg = styled.div`
  margin: 0 auto 0 0;
  margin-bottom: 10px;
  padding: 15px;
  max-width: 65%;
  height: auto;
  background-color: #eaeffc;
  color: #545454;
  border: none;
  border-radius: 15px;
  word-break: break-all;
  white-space: pre-line;
`;

export const StUserMsg = styled.div`
  margin: 10px 10px 0 10px;
  padding: 15px;
  max-width: 40%;
  height: auto;
  background-color: #5087ff;
  color: white;
  border: none;
  border-radius: 15px;
  position: relative;
  display: flex;
  margin: 0 0 0 auto;
  margin-bottom: 10px;
  word-break: break-all;
`;

export const StNickname = styled.div`
  max-width: 20%;
  text-align: right;
  margin: 0 5px 0 auto;
  color: #545454;
`;

export const ChatDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: #cecece;
  div {
    margin-top: 10px;
  }
  span {
    color: #ff00b3;
  }
`;
