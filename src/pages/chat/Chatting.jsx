import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const Chatting = ({ socket, roomName, onChat }) => {
  const [msg, setMsg] = useState("");
  const [chatting, setChatting] = useState([]);
  const [endChat, setEndChat] = useState(false);
  const nickname = localStorage.getItem("nickname");

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
    console.log(obj);
    setMsg("");
  };
  console.log(chatting);

  return (
    <StContainer isOpen={onChat} isClose={endChat}>
      <StWrap>
        <StHeader>
          <div>SPOTS</div>
          <button onClick={() => setEndChat(!endChat)}>
            <BsXLg size="18" color="#FF00B3" />
          </button>
        </StHeader>
        <ChatBox>
          {chatting?.map((chat, index) => (
            <div key={index}>
              {chat.nickname === "admin" ? (
                <StAdmin>
                  <img alt="기본프로필" src="/myprofile_icon.png" />
                  <StAdminMsg>{chat.message}</StAdminMsg>
                </StAdmin>
              ) : (
                <StAdmin>
                  <StNickname>{chat.nickname}</StNickname>
                  <StUserMsg>{chat.message}</StUserMsg>
                </StAdmin>
              )}
            </div>
          ))}
        </ChatBox>

        <StForm onSubmit={onSendMsg}>
          <StInput
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="메시지를 입력해주세요"
          />
          <button>
            <FiSend size="23" />
          </button>
        </StForm>
      </StWrap>
    </StContainer>
  );
};

export default Chatting;

const StContainer = styled.div`
  bottom: 60px;
  right: 35px;
  position: fixed;
  z-index: 999999;
  left: 0px;
  visibility: hidden;
  opacity: 0;
  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
  ${({ isClose }) =>
    isClose &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

const StWrap = styled.div`
  width: 390px;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 1px solid lightgray;
  background-color: #f8f8f8;
`;

const StHeader = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0000000d;
  border-radius: 8px;
  div {
    font-size: 19px;
    font-weight: 700;
    margin-left: 30px;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 10px 0 10px;
  }
`;

const ChatBox = styled.div`
  height: 505px;
  overflow: scroll;
  border: none;
  margin: 10px 10px 0 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StForm = styled.form`
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  background-color: #0000000d;
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 10px 0 10px;
  }
`;
const StInput = styled.input`
  width: 360px;
  height: 40px;
  border-radius: 20px;
  border: 1px;
`;

const StAdmin = styled.div`
  img {
    width: 30px;
    height: 30px;
  }
`;

const StAdminMsg = styled.div`
  margin: 0 auto 0 0;
  margin-bottom: 10px;
  padding: 15px;
  max-width: 45%;
  height: auto;
  background-color: #eaeffc;
  color: #545454;
  border: none;
  border-radius: 15px;
  word-break: break-all;
`;

const StUserMsg = styled.div`
  margin: 10px 10px 0 10px;
  padding: 15px;
  max-width: 40%;
  height: auto;
  background-color: #5087ff;
  color: white;
  border: none;
  border-radius: 15px;
  position: relative;
  display: flex;
  margin: 0 0 0 auto;
  margin-bottom: 10px;
  word-break: break-all;
`;

const StNickname = styled.div`
  max-width: 20%;
  text-align: right;
  margin: 0 5px 0 auto;
  color: #545454;
`;
