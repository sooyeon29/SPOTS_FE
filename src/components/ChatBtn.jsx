import React, { useState } from "react";
import styled from "styled-components";
import ChatRoom from "../pages/chat/ChatRoom";

const ChatBtn = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <Btn onClick={() => setOpenChat(!openChat)}>
        <img alt="chatBtn" src="/private.png" />
      </Btn>
      {openChat ? <ChatRoom /> : null}
    </>
  );
};

export default ChatBtn;

const Btn = styled.div`
  width: 100px;
  height: 100px;
  bottom: 80px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9;
  border-radius: 80px;
  background-color: #fefefe;
  img {
    width: 70px;
    height: 70px;
  }
`;
