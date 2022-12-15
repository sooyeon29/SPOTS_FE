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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ chatOpen }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
            <p>궁금한 점은 언제든지 문의주세요.</p>
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
                if (token) {
                  window.location.replace("/chatting");
                } else {
                  Swal.fire({
                    text: "로그인 후 이용해주세요",
                    width: "300px",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#40d295",
                    showClass: { popup: "animated fadeInDown faster" },
                    hideClass: { popup: "animated fadeOutUp faster" },
                  });
                  navigate("/login");
                }
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
