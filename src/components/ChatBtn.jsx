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
  @media screen and (max-width: 420px) {
    right: 8%;
  }

  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 9;
  bottom: 80px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  right: 28%;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    border-radius: 90px;
  }
`;
