import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import socket from "../../tools/socket.js";
import {
  StContainer,
  StWrap,
  RoomForm,
  RoomInput,
  RoomBtn,
} from "./Styles.jsx";
import { io } from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket", "polling"],
});

const AdminHome = () => {
  const navigate = useNavigate();
  const [roomList, setRoomList] = useState();
  const [roomName, setRoomName] = useState();
  const [chatList, setChatList] = useState();

  useEffect(() => {
    console.log("socket", socket);
    socket.on("admin_roomlist", (roomList) => {
      console.log("admin_roomlist", roomList);
      setRoomList(roomList);
    });
    socket.on("on_chat", (list) => {
      console.log("on_chat", list);
    });
    // socket.on("chat_list", (list) => {
    //   console.log("chat_list", list);
    //   setChatList(list);
    // });
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
        {/* <ul style={{ color: "blue" }}>
          {chatList?.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul> */}
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

// const StContainer = styled.div`
//   display: flex;
// `;

// const StWrap = styled.div``;

// const RoomForm = styled.form`
//   width: 350px;
//   height: 130px;
//   border: 1px solid lightgray;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;

// const RoomInput = styled.input`
//   width: 330px;
//   height: 20px;
//   margin: -20px auto 0 auto;
//   border: 1px solid lightgray;
// `;

// const RoomBtn = styled.button`
//   width: 80px;
//   height: 40px;
//   color: white;
//   background-color: #3a6dfa;
//   border: none;
//   border-radius: 6px;
//   margin: 10px 0 0 8px;
//   cursor: pointer;
// `;
