import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ChatBtn = ({ chatHandler, chatRef }) => {
  const navigate = useNavigate();
  return (
    <>
      <Btn onClick={chatHandler} ref={chatRef}>
        <img alt="chatBtn" src="/spotsSymbol.png" />
      </Btn>
      {/* <Btn onClick={() => window.location.replace("/chatting")}></Btn> */}
    </>
  );
};

export default ChatBtn;

const Btn = styled.div`
  width: 90px;
  height: 90px;
  bottom: 80px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9;
  border-radius: 50%;
  border: 3px solid #fefefe;
  background-color: #fefefe;
  img {
    width: 90px;
    height: 90px;
    border-radius: 90px;
  }
`;
