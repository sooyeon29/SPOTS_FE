import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { IoIosArrowBack } from "react-icons/io";
import { BsXLg } from "react-icons/bs";

const Chat = ({ setInquiry }) => {
  const socket = io("https://ws-study.shop", {
    cors: {
      origin: "http://localhost:3000",
    },
    transports: ["websocket", "polling"],
  });

  //소켓이 서버에 연결되어 있는지 여부
  socket.on("a", (data) => {
    console.log("됐다"); // true
    console.log(data);
    console.log(data.msg); // true/false
  });

  const initialState = { message: "", from: false };
  const [chatArr, setChatArr] = useState([]);
  const [message, setMessage, onChange] = useInput(initialState);
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("chatting", {
      message: message.message,
      from: false,
    });
    setMessage(initialState);
  };

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("receive", (message, from) => {
      console.log(message);
      setChatArr((chatArr) => [
        ...chatArr,
        { message: message.message, from: from },
      ]);
      console.log(name);
    });
  }, []);

  console.log(chatArr);
  return (
    <StContainer>
      <StBox>
        <StHeader>
          <button>
            <IoIosArrowBack size="25" color="#FF00B3" />
          </button>
          <div>SPOTS</div>
          <button>
            <BsXLg size="18" color="#FF00B3" />
          </button>
        </StHeader>
        <StForm onSubmit={submitHandler}>
          <StInput
            value={message.message}
            name="message"
            onChange={onChange}
            placeholder="메시지를 입력해주세요"
          />
          <StBtn>send</StBtn>
        </StForm>
        {chatArr?.map((chat) =>
          chat.from ? (
            <div>
              <div>메세지={chat.message}</div>
              {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
            </div>
          ) : (
            <div>
              <div>메세지:{chat.message}</div>
              {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
            </div>
          )
        )}
      </StBox>
    </StContainer>
  );
};

export default Chat;

const StContainer = styled.div`
  bottom: 40px;
  right: 35px;
  position: fixed;
`;

const StBox = styled.div`
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

const StForm = styled.form`
  display: flex;
  position: absolute;
  margin: 0 auto 0 auto;
  bottom: 20px;
`;
const StInput = styled.input`
  width: 360px;
  height: 40px;
  border-radius: 10px;
`;

const StBtn = styled.div`
  width: 65px;
  height: 40px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
`;
