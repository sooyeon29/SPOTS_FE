import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import socket from "../../tools/socket";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import _ from "lodash";

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
    socket.on("start_chat", (data) => {
      console.log("start_chat", data);
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

  // const onChat = () => {
  //   console.log("버튼딸깍");
  //   const obj = {
  //     roomName: roomName,
  //     nickname: nickname,
  //   };
  //   socket.emit("on_chat", JSON.stringify(obj));
  //   console.log(obj);
  // };

  return (
    <Layout>
      <StWrap>
        <StHeader>
          <div>SPOTS</div>
          <button onClick={() => navigate("/")}>
            <BsXLg size="18" color="#FF00B3" />
          </button>
        </StHeader>
        <ChatBox ref={boxRef}>
          <ChatDesc>
            <img
              alt="spotslogo"
              src="/spotslogo.png"
              style={{ width: "100px", height: "100px" }}
            />
            <div>구장 예약, 경기 매칭 no1 플랫폼 </div>
            <div>상담시간 10:00-11:00</div>
          </ChatDesc>
          {/* <button onClick={onChat}>1:1문의하기</button> */}
          {chatting?.map((chat, index) => (
            <div key={index}>
              {chat.nickname === "admin" ? (
                <StAdmin>
                  <img alt="기본프로필" src="/myprofile_icon.png" />
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
    </Layout>
  );
};

export default Chatting;

const StWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
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
  height: 690px;
  overflow-y: scroll;
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
  bottom: -30px;
`;

const StInput = styled.input`
  width: 100%;
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
  max-width: 65%;
  height: auto;
  background-color: #eaeffc;
  color: #545454;
  border: none;
  border-radius: 15px;
  word-break: keep-all;
  white-space: pre-line;
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

const ChatDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: #cecece;
  div {
    margin-top: 10px;
  }
`;
