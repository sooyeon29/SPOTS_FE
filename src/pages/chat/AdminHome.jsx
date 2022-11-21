import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import socket from "../../tools/socket.js";

const AdminHome = () => {
  const navigate = useNavigate();
  //const initialState = ["eunrain", "melongbbang", "dduyamott"];
  const [roomList, setRoomList] = useState();
  console.log(roomList);

  const [roomName, setRoomName] = useState();

  //const [enterRoom, setEnterRoom] = useState(false);

  useEffect(() => {
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

const StContainer = styled.div`
  display: flex;
`;

const StWrap = styled.div``;

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
