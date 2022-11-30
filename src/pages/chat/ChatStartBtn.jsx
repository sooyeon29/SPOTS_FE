import { BsXLg } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useToggle from "../../hooks/useToggle";
import Chatting from "./Chatting";

const ChatStart = () => {
  const navigate = useNavigate();
  const [waitChat, setWaitChat, waitChatHandler] = useToggle();
  return (
    <>
      {!waitChat && (
        <StContainer>
          <StWrap>
            <StHeader>
              <div>SPOTS</div>
              <button onClick={() => navigate("/")}>
                <BsXLg size="18" color="#FF00B3" />
              </button>
            </StHeader>
            <ChatBox>
              <button onClick={waitChatHandler}>문의할꺼야!!</button>

              <div></div>
            </ChatBox>

            <StForm>
              <StInput placeholder="메시지를 입력해주세요" />
              <button>
                <FiSend size="23" />
              </button>
            </StForm>
          </StWrap>
        </StContainer>
      )}
      {waitChat && <Chatting />}
    </>
  );
};
export default ChatStart;

const StContainer = styled.div``;

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
  height: 670px;
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
