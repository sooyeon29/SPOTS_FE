import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";

const ChatBtn = ({ chatHandler, chatRef }) => {
  const navigate = useNavigate();

  const socket = io.connect(process.env.REACT_APP_SOCKET, {
    cors: {
      origin: "http://localhost:3000",
    },
    transports: ["websocket", "polling"],
  });

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
  width: 60px;
  height: 60px;
  border: 3px solid #fefefe;
  background-color: #fefefe;
  border-radius: 50%;
  z-index: 9;
  right: 5%;
  bottom: 80px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  img {
    width: 60px;
    height: 60px;
    border-radius: 90px;
  }
`;
