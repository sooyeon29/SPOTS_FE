import React from "react";
import { useNavigate } from "react-router-dom";
import { UserpageAPI } from "../../tools/instance";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import styled from "styled-components";

const SwitchAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <Header />
        <Container>
          <Logo>
            <img alt="logo" src="/login/switch_logo.png" />
          </Logo>
          <First>
            <h2>
              잠자고 있는
              <p>회원님의 아이디를</p>
              깨워주세요!
            </h2>
          </First>
          <Second>
            고객님의 아이디는 현재 휴면 상태입니다.
            <p>아래의 버튼을 클릭하셔서 휴면을 해제해주세요.</p>
          </Second>
          <Btns>
            <button
              onClick={() => {
                UserpageAPI.switchMe()
                  .then((res) => {
                    if (res.status === 200) {
                      Swal.fire({
                        text: "계정이 활성화되었습니다.",
                        width: "300px",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#40d295",
                        showClass: { popup: "animated fadeInDown faster" },
                        hideClass: { popup: "animated fadeOutUp faster" },
                      });
                      // localStorage.clear();
                      navigate("/login");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              휴면 해제하기
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              취소
            </button>
          </Btns>
        </Container>
      </Layout>
    </>
  );
};

export default SwitchAccount;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  margin: 0 20px 0 20px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 50%;
    height: 50%;
  }
`;

const First = styled.div`
  line-height: 12px;
  margin-top: 50px;
`;

const Second = styled.div`
  line-height: 5px;
  margin-top: 20px;
`;
const Btns = styled.div`
  margin-top: 50px;

  button:first-child {
    background-color: #1746c7;
    border-radius: 47px;
    width: 48%;
    height: 52px;
    color: #ffffff;
    border: none;
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
  }

  button:last-child {
    background-color: #cecece;
    border-radius: 47px;
    width: 48%;
    height: 52px;
    color: #000000;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
`;
