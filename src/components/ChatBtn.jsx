import React from "react";
import styled from "styled-components";

const ChatBtn = ({ chatHandler, chatRef }) => {
  return (
    <>
      <Btn onClick={chatHandler} ref={chatRef}>
        <img alt="chatBtn" src="/mainpage/chatLogo.png" />
      </Btn>
    </>
  );
};

export default ChatBtn;

const Btn = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 9;
  bottom: 80px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  right: 8%;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    border-radius: 90px;
  }
`;
