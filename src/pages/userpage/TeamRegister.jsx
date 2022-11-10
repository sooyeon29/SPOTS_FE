import React, { useRef } from "react";
import { StContainer, StTeamForm, StWrap } from "./Styles";
import Header from "../../components/Header";
import { UserpageAPI } from "../../tools/instance";
import { useNavigate } from "react-router-dom";

const TeamRegister = () => {
  const navigate = useNavigate();

  const imgRef = useRef([]);
  const nameRef = useRef();
  const membersRef = useRef();
  const sportsRef = useRef();

  const registerHandler = (e) => {
    e.preventDefault();
    if (
      nameRef.current.value === "" ||
      sportsRef.current.value === "" ||
      membersRef.current.value === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    } else {
      const formData = new FormData();
      formData.append("image", imgRef.current.files[0]);
      formData.append("teamName", nameRef.current.value);
      formData.append("sports", sportsRef.current.value);
      formData.append("member", membersRef.current.value);

      for (let a of formData.entries()) {
        console.log("formData출력", a);
      }

      UserpageAPI.postMyteam(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("팀 등록이 완료 되었습니다!");
            navigate("/teamdetail");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            alert("중복된 팀 이름입니다!");
          }
        });
    }
  };

  return (
    <>
      <Header />
      <StContainer>
        <StWrap>
          <StTeamForm onSubmit={registerHandler} enctype="multipart/form-data">
            <input
              type="file"
              ref={imgRef}
              accept="image/*" //모든 이미지 파일의 확장자를 허용한다
            />
            <input type="text" placeholder="team name" ref={nameRef} />
            <input
              type="number"
              placeholder="number of members"
              ref={membersRef}
            />
            <select ref={sportsRef}>
              <option value="">Sports</option>
              <option value="football">FOOTBALL⚽</option>
              <option value="tennis">TENNIS🥎</option>
              <option value="badminton">BADMINTON🏸</option>
            </select>
            <button>등록하기</button>
          </StTeamForm>
        </StWrap>
      </StContainer>
    </>
  );
};

export default TeamRegister;
