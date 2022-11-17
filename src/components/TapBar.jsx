import React from "react";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TapBar = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div>
        <BiHomeAlt size="29" onClick={() => navigate("/")} />
      </div>
      <div>
        <TbCalendarTime size="28" />
      </div>
      <div>
        <FiSearch size="25" />
      </div>
      <div>
        <IoPersonOutline size="27" />
      </div>
    </Container>
  );
};

export default TapBar;

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  position: absolute;
  top: 800px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  div {
    cursor: pointer;
    margin: auto;
  }
`;
