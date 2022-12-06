import React, { useRef, useState } from "react";
import { PageDesc, ProfilePhotoInput } from "./Styles";
import { UserpageAPI } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";
import Swal from "sweetalert2";

const TeamRegister = () => {
  const title = "나의 팀";
  const navigate = useNavigate();

  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);

  const nameRef = useRef();
  const [sports, setSports] = useState("");
  const [count, setCount] = useState(0);

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
    if (nameRef.current.value.trim() === "" || sports === "" || count === "") {
      return Swal.fire({
        text: "모든 항목을 입력해주세요.",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else if (count === 0 || count === 1) {
      Swal.fire({
        text: "팀 등록은 2명부터 가능합니다.",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("teamName", nameRef.current.value);
      formData.append("sports", sports);
      formData.append("member", count);

      for (let a of formData.entries()) {
        console.log("formData출력", a);
      }

      UserpageAPI.postMyteam(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            Swal.fire({
              text: "팀 등록이 완료되었습니다.",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            navigate("/teampage");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.code === -2) {
            Swal.fire({
              text: "중복된 팀 이름입니다.",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
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
          <ImageUpload>
            <HostingPhotoUpload>
              <label htmlFor="upload-input">
                <div>
                  {preview.length > 0 ? (
                    <span>
                      <img alt="cancel_icon" src="/cancel_icon.png" />
                    </span>
                  ) : (
                    <span>
                      <img alt="plus_icon" src="/plus_icon_blue.png" />
                    </span>
                  )}
                </div>
              </label>
              <ProfilePhotoInput
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImagePreview(e);
                }}
                multiple="multiple"
              />
            </HostingPhotoUpload>
            <HostPreview>
              {preview.length > 0 ? (
                <img
                  key={1}
                  src={preview}
                  alt=""
                  onerror="this.style.display='none';"
                />
              ) : (
                <Preview></Preview>
              )}
            </HostPreview>
          </ImageUpload>
          <InputBox>
            <TeamLayout>
              <div>팀이름</div>
              <InputText
                type="text"
                maxLength="10"
                placeholder="team name"
                ref={nameRef}
              />
            </TeamLayout>
            <SportsLayout>
              <div>선호운동</div>
              <SpotsLabel>
                <FootballInput
                  type="radio"
                  value="풋살장"
                  checked={sports === "풋살장"}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <FootballDiv></FootballDiv>
              </SpotsLabel>
              <SpotsLabel>
                <TennisInput
                  type="radio"
                  value="테니스장"
                  checked={sports === "테니스장"}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <TennisDiv></TennisDiv>
              </SpotsLabel>
              <SpotsLabel>
                <BadmintonInput
                  type="radio"
                  value="배드민턴장"
                  checked={sports === "배드민턴장"}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <BadmintonDiv></BadmintonDiv>
              </SpotsLabel>
            </SportsLayout>
            <TeamLayout>
              <div>인원</div>
              {count === 0 ? (
                <MinusBtn disabled>-</MinusBtn>
              ) : (
                <MinusBtn onClick={() => setCount(count - 1)}>-</MinusBtn>
              )}
              <CountBox>{count}</CountBox>
              <PlusBtn
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </PlusBtn>
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

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StTeamForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  margin: auto;
`;

const InputText = styled.input`
  display: flex;
  border: 1px solid #cecece;
  border-radius: 10px;
  width: 200px;
  padding-left: 10px;
  height: 30px;
  :focus {
    outline: none;
  }
`;

const TeamLayout = styled.div`
  display: flex;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  width: 90%;
  margin: auto;
  div:first-child {
    width: 100px;
    text-align: center;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }
`;

const SportsLayout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  width: 90%;
  margin: auto;
  div:first-child {
    width: 100px;
    text-align: center;
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
  margin-top: 50px;
`;

const SpotsLabel = styled.label``;

const FootballInput = styled.input`
  display: none;
`;

const TennisInput = styled.input`
  display: none;
`;

const BadmintonInput = styled.input`
  display: none;
`;

const FootballDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/football_gray.png");
  background-size: 55px;

  ${FootballInput}:checked + && {
    background-image: url("/mypage/football_blue.png");
    background-size: 55px;
  }

  img {
    width: 60px;
    height: 60px;
  }
`;

const TennisDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/tennis_gray.png");
  background-size: 55px;

  ${TennisInput}:checked + && {
    background-image: url("/mypage/tennis_blue.png");
    background-size: 55px;
  }
`;

const BadmintonDiv = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/mypage/badminton_gray.png");
  background-size: 55px;

  ${BadmintonInput}:checked + && {
    background-image: url("/mypage/badminton_blue.png");
    background-size: 55px;
  }
`;

const PlusBtn = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #1746c7;
  border-radius: 20px;
  color: #ffffff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

const MinusBtn = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 30px;
  color: #231f20;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
`;

const CountBox = styled.div`
  width: 80px;
  height: 30px;
  background-color: #f5f5f5;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-right: -10px;
  z-index: 1;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const HostingPhotoUpload = styled.div`
  img {
    width: 20px;
    position: absolute;
  }
`;

const HostPreview = styled.div`
  img {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    object-fit: cover;
  }
`;

const Preview = styled.div`
  div:first-child {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;
    border-radius: 100px;
  }
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  border-radius: 100px;
`;
