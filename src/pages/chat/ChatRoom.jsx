import React, { useState } from "react";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Chat from "./Chat";
import { io } from "socket.io-client";

const Chat1 = () => {
  const socket = io("https://ws-study.shop", {
    cors: {
      origin: "http://localhost:3000",
    },
    transports: ["websocket", "polling"],
  });

  socket.on("a", (data) => {
    console.log("됐다"); // true
    console.log(data);
    console.log(data.msg); // true/false
  });
  const [inquiry, setInquiry] = useState(false);

  return (
    <StContainer>
      <StBox>
        <StHeader>
          <img alt="spots logo" src="/public.png" />
          <div>SPOTS</div>
          <button>
            <BsXLg size="20" color="#FF00B3" />
          </button>
        </StHeader>
        <StContent>
          성장기회의 평등🌱
          <p>궁금한 점은 언제든지 문의해주세요.</p>
        </StContent>
        <StChat>
          <StChatContent>
            <img alt="인프런 로고 화이트" src="/public.png" />
            <div>
              SPOTS
              <p>
                안녕하세요 <strong>SPOTS</strong>입니다 😀
              </p>
              <p>오늘도 SPOTS을 이용해주셔서 감사해요.</p>
            </div>
          </StChatContent>
          <Button onClick={() => setInquiry(!inquiry)}>
            <IoSend />
            <strong>새 문의하기</strong>
          </Button>
          {inquiry ? <Chat setInquiry={setInquiry} /> : null}
        </StChat>
      </StBox>
    </StContainer>
  );
};

export default Chat1;

const Button = styled.button`
  width: 370px;
  height: 60px;
  margin: auto;
  border-radius: 20px;
  border: none;
  font-size: 19px;
  cursor: pointer;
  background-color: #0000000d;
  :hover {
    background-color: #00000014;
  }
`;

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
  display: flex;
  align-items: center;
  margin: 20px 0 0 23px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 45px;
  }
  div {
    font-size: 24px;
    margin: 7px 0 0 9px;
    font-weight: 500;
  }
  button {
    border: none;
    background-color: transparent;
    margin: 3px 0 0 230px;
    cursor: pointer;
  }
`;

const StContent = styled.div`
  height: 90px;
  margin: 15px 0 0 23px;
  font-size: 18px;
  color: #00000066;
  font-weight: 500;
  p {
    margin-top: 4px;
  }
`;

const StChat = styled.div`
  width: 420px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 35px;
  border: 1px solid lightgray;
  box-shadow: 15px 10px 30px #efeff0;
  margin: -10px auto 0 auto;
`;

const StChatContent = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 20px;
  img {
    width: 45px;
    height: 45px;
    border-radius: 45px;
  }
  div {
    margin: 10px;
  }
  p {
    margin: 1px;
    font-size: 18px;
  }
`;
