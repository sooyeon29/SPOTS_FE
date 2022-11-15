import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useInput from "../../hooks/useInput";

const Chat = () => {
  const socket = io();

  //   //소켓이 서버에 연결되어 있는지 여부
  //   socket.on("connect", () => {
  //     console.log(socket.connected); // true
  //   });

  //   //소켓이 서버에 연결 해제되었는지 여부
  //   socket.on("connect", () => {
  //     console.log(socket.connected); // false
  //   });

  const initialState = { nickname: "", message: "", from: false };
  const [chatArr, setChatArr] = useState([]);
  const [message, setMessage, onChange] = useInput(initialState);
  const [name, setName] = useState("");

  const submitHandler = () => {
    socket.emit("chatting", {
      nickname: name,
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
        { nickname: message.nickname, message: message.message, from: from },
      ]);
      console.log(name);
    });
  }, []);

  console.log(chatArr);
  return (
    <>
      <input
        value={name}
        name="nickname"
        placeholder="닉네임"
        onChange={(e) => {
          console.log(name);
          setName(e.target.value);
        }}
      />
      <input
        value={message.message}
        name="message"
        onChange={onChange}
        placeholder="메시지를 입력해주세요"
      />
      <button onClick={() => submitHandler()}>send</button>
      {chatArr?.map((chat) =>
        chat.from ? (
          <div>
            <div>닉네임={chat.nickname}</div>
            <div>메세지={chat.message}</div>
            {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
          </div>
        ) : (
          <div>
            <div>닉네임:{chat.nickname}</div>
            <div>메세지:{chat.message}</div>
            {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
          </div>
        )
      )}
    </>
  );
};

export default Chat;
