import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserpageAPI } from "../../tools/instance";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import styled from "styled-components";

const SwitchAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginId = location.state;

  return (
    <>
      <Layout>
        <Header />
        <Container>
          <div>SPOTS 휴면계정 전환 안내</div>
          <div>
            <p>{loginId}님의 계정은 현재 휴면 상태입니다.</p>
          </div>
          <button
            onClick={() => {
              UserpageAPI.switchMe()
                .then((res) => {
                  console.log(res);
                  if (res.status === 200) {
                    Swal.fire({
                      text: "계정이 활성화되었습니다. 로그인 페이지로 이동합니다.",
                      width: "300px",
                      confirmButtonText: "확인",
                      confirmButtonColor: "#40d295",
                      showClass: { popup: "animated fadeInDown faster" },
                      hideClass: { popup: "animated fadeOutUp faster" },
                    });
                    localStorage.clear();
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
              localStorage.clear();
              navigate("/login");
            }}
          >
            취소
          </button>
        </Container>
      </Layout>
    </>
  );
};

export default SwitchAccount;

const Container = styled.div`
  padding-top: 100px;
  padding-left: 30px;
`;
