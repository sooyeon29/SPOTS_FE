import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../tools/socket";
import {
  StContainer,
  StWrap,
  ChatBox,
  RoomForm,
  RoomInput,
  RoomBtn,
} from "./Styles";
// import { io } from "socket.io-client";
// const socket = io.connect(process.env.REACT_APP_SOCKET, {
//   path: "/socket.io",
//   cors: {
//     origin: "http://localhost:3000",
//   },
//   transports: ["websocket", "polling"],
// });
const AdminChat = () => {
  const location = useLocation();
  const roomName = location.state;
  const [msg, setMsg] = useState("");
  const [chatting, setChatting] = useState([]);
  const nickname = "admin";

  useEffect(() => {
    socket.on("new_message", (data) => {
      console.log("new_message", data);
      setChatting((chat) => [
        ...chat,
        { nickname: data.nickname, message: data.message },
      ]);
    });
    socket.on("left_notice", (message) => {
      console.log("left_notice", message);
      setChatting((chat) => [...chat, message]);
    });
  }, []);

  const onSendMsg = (e) => {
    e.preventDefault();
    const obj = {
      roomName: roomName,
      nickname: nickname,
      value: msg,
    };
    socket.emit("chatting", JSON.stringify(obj));
    console.log(JSON.stringify(obj));
    setMsg("");
  };
  console.log(chatting);
  return (
    <StContainer>
      <StWrap>
        <h1>SPOTS</h1>
        <div>Room Name:{roomName} </div>
        <ChatBox>
          {chatting?.map((chat, index) => (
            <div key={index}>
              <div>{chat.nickname}</div>
              <div>{chat.message}</div>
            </div>
          ))}
        </ChatBox>
        <RoomForm onSubmit={onSendMsg}>
          <RoomInput
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <RoomBtn>Send</RoomBtn>
        </RoomForm>
      </StWrap>
    </StContainer>
  );
};

export default AdminChat;
