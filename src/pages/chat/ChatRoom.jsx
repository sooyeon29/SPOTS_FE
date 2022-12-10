import React from "react";
import { BsXLg } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import {
  RoomStContainer,
  StBox,
  StHeader,
  StContent,
  StChat,
  StChatContent,
  Button,
} from "./Styles";

const ChatRoom = ({ chatOpen }) => {
  return (
    <>
      <RoomStContainer isOpen={chatOpen}>
        <StBox>
          <StHeader>
            <img alt="spots logo" src="/chat/s_logo.png" />
            <div>SPOTS</div>
            <button>
              <BsXLg size="20" color="#FF00B3" />
            </button>
          </StHeader>
          <StContent>
            슬기로운 운동 생활 No.1 플랫폼, SPOTS ⚽️🎾🏸
            <p>문의하기 기능은 곧 오픈될 예정입니다!</p>
          </StContent>
          <StChat>
            <StChatContent>
              <img alt="인프런 로고 화이트" src="/myprofile_logo.png" />
              <div>
                SPOTS
                <p>
                  안녕하세요 <strong>SPOTS</strong>입니다 😀
                </p>
                <p>오늘도 SPOTS를 이용해주셔서 감사해요.</p>
              </div>
            </StChatContent>
            <Button
              onClick={() => {
                window.location.replace("/chatting");
              }}
            >
              <IoSend />
              <strong>새 문의하기</strong>
            </Button>
          </StChat>
        </StBox>
      </RoomStContainer>
    </>
  );
};

export default ChatRoom;
