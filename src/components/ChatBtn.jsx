import React from "react";
import styled from "styled-components";

const ChatBtn = ({ chatHandler, chatRef }) => {
  return (
    <>
      <Btn onClick={chatHandler} ref={chatRef}>
        <img alt="chatBtn" src="/private.png" />
      </Btn>
    </>
  );
};

export default ChatBtn;

const Btn = styled.div`
  width: 80px;
  height: 80px;
  bottom: 80px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9;
  border-radius: 50%;
  border: 3px solid #00F78E;
  background-color: #fefefe;
  img {
    width: 70px;
    height: 70px;
  }
`;
