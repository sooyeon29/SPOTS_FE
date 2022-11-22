import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const Chat = ({ socket, roomName }) => {
  const [msg, setMsg] = useState("");
  const [chatting, setChatting] = useState([]);
  console.log(roomName);
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
    <StContainer>
      <StWrap>
        <StHeader>
          <button>
            <IoIosArrowBack size="25" color="#FF00B3" />
          </button>
          <div>SPOTS</div>
          <button>
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

export default Chat;

const StContainer = styled.div`
  bottom: 40px;
  right: 35px;
  position: fixed;
`;

const StWrap = styled.div`
  width: 450px;
  height: 600px;

  display: flex;
  flex-direction: column;
  border-radius: 35px;
  border: 1px solid lightgray;
  background-color: #f8f8f8;
  box-shadow: 15px 10px 30px #efeff0;
`;

const StHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0000000d;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  div {
    font-size: 19px;
    font-weight: 700;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 10px 0 10px;
  }
`;

const ChatBox = styled.div`
  height: 485px;
  overflow: scroll;
  border: none;
  margin: 10px 10px 0 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 auto 0 auto;
  bottom: 0px;
  border-radius: 35px;

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
`;

const StNickname = styled.div`
  max-width: 20%;
  text-align: right;
  margin: 0 5px 0 auto;
  color: #545454;
`;
