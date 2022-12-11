import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TapBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <Container>
      <div>
        <BiHomeAlt size="29" onClick={() => navigate("/")} />
      </div>
      <div>
        <FiSearch size="25" onClick={() => navigate("/book")} />
      </div>
      <div>
        <TbCalendarTime
          size="28"
          onClick={() => {
            if (!token) {
              Swal.fire({
                text: "나의 예약 리스트는 로그인 후 확인 가능합니다.",
                width: "300px",
                showCancelButton: true,
                confirmButtonText: "로그인하러 가기",
                confirmButtonColor: "#40d295",
                cancelButtonColor: "#FF00B4",
                cancelButtonText: "취소",
                showClass: { popup: "animated fadeInDown faster" },
                hideClass: { popup: "animated fadeOutUp faster" },
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/login");
                }
              });
            } else navigate("/reservpage");
          }}
        />
      </div>

      <div>
        <IoPersonOutline
          size="27"
          onClick={() => {
            !token ? navigate("/login") : navigate("/userpage");
          }}
        />
      </div>
    </Container>
  );
};

export default TapBar;

const Container = styled.div`
  max-width: 390px;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
    margin: auto;
  }
`;
