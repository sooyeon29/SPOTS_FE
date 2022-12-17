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

const Chatting = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [roomName, setRoomName] = useState();
  const [chatting, setChatting] = useState([]);
  const nickname = localStorage.getItem("nickname");

  const scrollRef = useRef();
  const boxRef = useRef(null);
  const [scrollState, setScrollState] = useState(true); //자동 스크롤 여부

  const scrollEvent = _.debounce(() => {
    const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
    const clientHeight = boxRef.current.clientHeight; // 요소의 높이
    const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false
    );
  }, 100);

  const scroll = useCallback(scrollEvent, []);

  useEffect(() => {
    if (scrollState) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatting]);

  useEffect(() => {
    boxRef.current.addEventListener("scroll", scroll);
  });

  useEffect(() => {
    socket.on("client_main", (roomName) => {
      setRoomName(roomName);
    });
    socket.on("new_message", (data) => {
      setChatting((chat) => [
        ...chat,
        { nickname: data.nickname, message: data.message },
      ]);
    });
    socket.on("left_notice", (message) => {
      setChatting((chat) => [...chat, { message: message }]);
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
    setMsg("");
  };

  const exitChat = () => {
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
            <div>
              <span>● </span>보통 수십 분 내 답변
            </div>
          </ChatDesc>
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
