import React, { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import Chatting from './Chatting';
import socket from '../../tools/socket';
import { useNavigate } from 'react-router-dom';
import {
  RoomStContainer,
  StBox,
  StHeader,
  StContent,
  StChat,
  StChatContent,
  Button,
} from './Styles';

const ChatRoom = ({ chatOpen, chatOpenRef }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState();
  const [onChat, setOnChat] = useState(false);

  // useEffect(() => {
  //   socket.on("client_main", (roomName) => {
  //     console.log("client_main", roomName);
  //     setRoomName(roomName);
  //   });
  // }, []);

  return (
    <>
      <RoomStContainer isOpen={chatOpen}>
        <StBox>
          <StHeader>
            <img alt="spots logo" src="/public.png" />
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
              <img alt="인프런 로고 화이트" src="/public.png" />
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
                // setOnChat(!onChat);
                // console.log(onChat);
                //navigate("/chatting");
                window.location.replace('/chatting');
              }}>
              <IoSend />
              <strong>새 문의하기</strong>
            </Button>
          </StChat>
        </StBox>
      </RoomStContainer>
      {/* <Chatting socket={socket} roomName={roomName} onChat={onChat} /> */}
    </>
  );
};

export default ChatRoom;

// const RoomStContainer = styled.div`
//   bottom: 60px;
//   position: fixed;
//   z-index: 9999;
//   visibility: hidden;
//   transition: 0.8s ease;
//   opacity: 0;
//   width: 100%;
//   ${({ isOpen }) =>
//     isOpen &&
//     css`
//       opacity: 1;
//       visibility: visible;
//     `}
// `;

// const StBox = styled.div`
//   @media screen and (min-width: 600px) {
//     width: 600px;
//     height: 500px;
//   }
//   width: 100%;
//   height: 550px;
//   display: flex;
//   flex-direction: column;
//   border-top-left-radius: 35px;
//   border-top-right-radius: 35px;
//   border: 1px solid lightgray;
//   background-color: #f8f8f8;
// `;

// const StHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 20px 0 0 23px;
//   img {
//     width: 45px;
//     height: 45px;
//     border-radius: 45px;
//   }
//   div {
//     font-size: 24px;
//     margin: 7px 0 0 9px;
//     font-weight: 500;
//   }
//   button {
//     @media screen and (min-width: 600px) {
//       margin-left: 400px;
//     }
//     border: none;
//     background-color: transparent;
//     margin: 3px 0 0 190px;
//     cursor: pointer;
//   }
// `;

// const StContent = styled.div`
//   height: 90px;
//   margin: 15px 0 0 23px;
//   font-size: 18px;
//   color: #00000066;
//   font-weight: 500;
//   p {
//     margin-top: 4px;
//   }
// `;

// const StChat = styled.div`
//   @media screen and (min-width: 600px) {
//     margin: -10px auto 0 auto;
//   }
//   margin: 0;
//   width: 100%;
//   height: 300px;
//   display: flex;
//   flex-direction: column;
//   border-radius: 35px;
//   border: 1px solid lightgray;
//   box-shadow: 15px 10px 30px #efeff0;
// `;

// const StChatContent = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 20px 0 0 20px;

//   img {
//     width: 45px;
//     height: 45px;
//     border-radius: 45px;
//   }
//   div {
//     margin: 10px;
//   }
//   p {
//     margin: 1px;
//     font-size: 18px;
//   }
// `;

// const Button = styled.button`
//   width: 370px;
//   height: 60px;
//   margin: auto;
//   border-radius: 20px;
//   border: none;
//   font-size: 19px;
//   cursor: pointer;
//   background-color: #0000000d;
//   :hover {
//     background-color: #00000014;
//   }
// `;
