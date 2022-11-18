import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { IoIosArrowBack } from "react-icons/io";
import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";

const Chat = ({ socket }) => {
  const initialState = { message: "", from: false };
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage, onChange] = useInput(initialState);
  const [name, setName] = useState("");

  useEffect(() => {
    socket.on("enter_notice", (data) => {
      console.log("데이터들어온다", data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   socket.emit("chatting", {
  //     message: message.message,
  //     from: false,
  //   });
  //   setMessage(initialState);
  // };

  // useEffect(() => {
  //   socket.on("receive", (message, from) => {
  //     console.log(message);
  //     setChatArr((chatArr) => [
  //       ...chatArr,
  //       { message: message.message, from: from },
  //     ]);
  //     console.log(name);
  //   });
  // }, []);

  // console.log(chatArr);
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
        <StForm>
          <StInput
            value={message.message}
            name="message"
            onChange={onChange}
            placeholder="메시지를 입력해주세요"
          />
          <button>
            <FiSend size="23" />
          </button>
        </StForm>
        {messageList?.map((chat) =>
          chat.from ? (
            <div>
              <div>메세지={chat.message}</div>
              {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
            </div>
          ) : (
            <div>
              <StMsgBox>{chat.message}</StMsgBox>
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
  margin-left: 25px;
`;

const StMsgBox = styled.div`
  width: 100px;
  background-color: #2b2bff;
  color: white;
  border: none;
  border-radius: 20px;
`;
