import React, { useRef, useState } from "react";
import {
  StTeamForm,
  StWrap,
  PageDesc,
  Image,
  ProfilePhotoUpload,
  ProfilePhotoInput,
} from "./Styles";
import { UserpageAPI } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";

const TeamRegister = () => {
  const title = "TeamPage";
  const navigate = useNavigate();

  const [preview, setPreview] = useState("/myprofile_logo.png");
  const [img, setImg] = useState(null);

  const nameRef = useRef();
  const membersRef = useRef();
  const sportsRef = useRef();

  const handleImagePreview = (file) => {
    setImg(null);
    setPreview([]);

    if (file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onloadend = () => {
        setImg(file.target.files[0]);

        const base64 = reader.result;
        if (base64) {
          const previewSub = base64.toString();
          setPreview(previewSub);
        }
      };
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value === "" ||
      sportsRef.current.value === "" ||
      membersRef.current.value === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    } else {
      const formData = new FormData();
      formData.append("image", img);
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
            navigate(`/teamdetail/${res.data.data.teamId}`);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            alert("중복된 팀 이름입니다!");
          }
        });
    }
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc>팀 등록</PageDesc>
        <StTeamForm onSubmit={registerHandler} enctype="multipart/form-data">
          <Image>
            <img alt="미리보기" src={preview} />
          </Image>
          <ProfilePhotoUpload>
            <label htmlFor="upload-input">
              <div>+</div>
            </label>
            <ProfilePhotoInput
              id="upload-input"
              type="file"
              placeholder=""
              onChange={(e) => {
                handleImagePreview(e);
              }}
              accept="image/*"
            />
          </ProfilePhotoUpload>
          <InputBox>
            <TeamLayout>
              <div>팀이름</div>
              <InputText type="text" placeholder="team name" ref={nameRef} />
            </TeamLayout>
            <TeamLayout>
              <div>팀인원</div>
              <InputText
                type="number"
                placeholder="number of members"
                ref={membersRef}
                min="1"
              />
            </TeamLayout>

            <TeamLayout>
              <div>종목</div>
              <SelectBox ref={sportsRef}>
                <option value="">Sports</option>
                <option value="풋살장">FOOTBALL⚽</option>
                <option value="테니스장">TENNIS🥎</option>
                <option value="배드민턴장">BADMINTON🏸</option>
              </SelectBox>
            </TeamLayout>
          </InputBox>
          <Btn>등록하기</Btn>
        </StTeamForm>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default TeamRegister;

const InputBox = styled.div`
  //margin-top: 10px;
  margin-bottom: 40px;
`;

const InputText = styled.input`
  display: flex;
  border: none;
  width: 150px;
  :focus {
    outline: none;
  }
`;

const SelectBox = styled.select`
  border: none;
  width: 150px;
`;

const TeamLayout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;

  div:first-child {
    width: 100px;
    /* background-color: aliceblue; */
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }

  div:last-child {
    margin-left: 20px;
  }
`;

const Btn = styled.button`
  width: 90%;
  height: 52px;
  background-color: #1746c7;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 47px;
  line-height: 52px;
  text-align: center;
  border: none;
  position: fixed;
  bottom: 120px;
`;
