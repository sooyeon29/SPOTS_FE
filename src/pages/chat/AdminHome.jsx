import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../tools/socket.js";
import {
  StContainer,
  StWrap,
  RoomForm,
  RoomInput,
  RoomBtn,
} from "./Styles.jsx";
//import { io } from "socket.io-client";

const AdminHome = () => {
  // const socket = io.connect(process.env.REACT_APP_SOCKET, {
  //   path: "/socket.io",
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  //   transports: ["websocket", "polling"],
  // });
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState();
  const [roomName, setRoomName] = useState();

  useEffect(() => {
    console.log("socket", socket);
    socket.on("admin_roomlist", (roomList) => {
      console.log("admin_roomlist", roomList);
      setRoomList(roomList);
    });
  }, []);

  const enterRoomHandler = () => {
    socket.emit("admin_enter_room", roomName);
    console.log(roomName);
    navigate("/adminchat", { state: roomName });
  };

  return (
    <StContainer>
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
    </StContainer>
  );
};

export default AdminHome;
