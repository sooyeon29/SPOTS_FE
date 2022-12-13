import React, { useEffect, useState } from "react";
import socket from "../../tools/socket.js";
import {
  StContainer,
  StWrap,
  RoomForm,
  RoomInput,
  RoomBtn,
  ChatBox,
} from "./Styles.jsx";

const AdminHome = () => {
  const [roomList, setRoomList] = useState();
  const [roomName, setRoomName] = useState();
  const [msg, setMsg] = useState("");
  const [chatting, setChatting] = useState([]);
  const nickname = "admin";
  const [chatMode, setChatMode] = useState(false);

  useEffect(() => {
    console.log("socket", socket);
    socket.on("admin_roomlist", (roomList) => {
      console.log("admin_roomlist", roomList);
      setRoomList(roomList);
    });
    console.log(socket);
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

  const enterRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("admin_enter_room", roomName);
    console.log(roomName);
    setChatMode(!chatMode);
  };

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
      {!chatMode ? (
        <StWrap>
          <h1>SPOTS</h1>
          <div>Open Rooms : </div>
          <ul>
            {roomList?.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
          <RoomForm onSubmit={enterRoomHandler}>
            <RoomInput
              name="roomName"
              placeholder="room name"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <RoomBtn>Enter Room</RoomBtn>
          </RoomForm>
        </StWrap>
      ) : (
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
      )}
    </StContainer>
  );
};

export default AdminHome;
