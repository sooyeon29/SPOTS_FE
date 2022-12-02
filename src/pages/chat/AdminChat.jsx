import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import socket from "../../tools/socket";

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
            <div>
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

const StContainer = styled.div`
  display: flex;
`;

const StWrap = styled.div``;

const ChatBox = styled.div`
  width: 350px;
  height: 400px;
  border: 1px solid lightgray;
  overflow: scroll;
`;
const RoomForm = styled.form`
  width: 350px;
  height: 130px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const RoomInput = styled.input`
  width: 330px;
  height: 20px;
  margin: -20px auto 0 auto;
  border: 1px solid lightgray;
`;

const RoomBtn = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: #3a6dfa;
  border: none;
  border-radius: 6px;
  margin: 10px 0 0 8px;
  cursor: pointer;
`;
