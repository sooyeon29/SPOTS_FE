import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import socket from "../../tools/socket";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import _ from "lodash";
import {
  ChattingStWrap,
  ChattingStHeader,
  ChattingChatBox,
  ChatDesc,
  StAdmin,
  StAdminMsg,
  StNickname,
  StUserMsg,
  StForm,
  StInput,
} from "./Styles";
// import { io } from "socket.io-client";

// console.log("1");
// let socket;

const Chatting = () => {
  // console.log("Chatting");
  // socket = io.connect(process.env.REACT_APP_SOCKET, {
  //   path: "/socket.io",
  //   cors: {
  //     origin: "http://localhost:3000",
  //   },
  //   transports: ["websocket", "polling"],
  // });
  // console.log("2");

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [roomName, setRoomName] = useState();
  const [chatting, setChatting] = useState([]);
  const nickname = localStorage.getItem("nickname");

  const scrollRef = useRef();
  const boxRef = useRef(null);
  const [scrollState, setScrollState] = useState(true); //자동 스크롤 여부

  const scrollEvent = _.debounce(() => {
    console.log("scroll");
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);

  const scroll = useCallback(scrollEvent, []);

  useEffect(() => {
    console.log(socket);
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatting]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  useEffect(() => {
    socket.on("client_main", (roomName) => {
      console.log("client_main", roomName);
      setRoomName(roomName);
    });
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

  const exitChat = () => {
    console.log("exit");
    socket.disconnect();
  };

  return (
    <Layout>
      <ChattingStWrap>
        <ChattingStHeader>
          <div>SPOTS</div>
          <button
            onClick={() => {
              exitChat();
              navigate("/");
            }}
          >
            <BsXLg size="18" color="#FF00B3" />
          </button>
        </ChattingStHeader>
        <ChattingChatBox ref={boxRef}>
          <ChatDesc>
            <img
              alt="spotslogo"
              src="/spotslogo.png"
              style={{ width: "100px", height: "100px" }}
            />
            <div>구장 예약, 경기 매칭 No.1 플랫폼 </div>
            <div>상담시간 10:00-11:00</div>
          </ChatDesc>
          {/* <button onClick={onChat}>1:1문의하기</button> */}
          {chatting?.map((chat, index) => (
            <div key={index}>
              {chat.nickname === "admin" ? (
                <StAdmin>
                  <img alt="기본프로필" src="/userpage/myprofile_icon.png" />
                  <StAdminMsg ref={scrollRef}>{chat.message}</StAdminMsg>
                </StAdmin>
              ) : (
                <>
                  <StNickname>{chat.nickname}</StNickname>
                  <StUserMsg ref={scrollRef}>{chat.message}</StUserMsg>
                </>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </ChattingChatBox>
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
      </ChattingStWrap>
    </Layout>
  );
};

export default Chatting;
