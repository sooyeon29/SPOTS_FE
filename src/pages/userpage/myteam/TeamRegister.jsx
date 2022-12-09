import React, { useRef, useState } from "react";
import { UserpageAPI } from "../../../tools/instance";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import FlexibleHeader from "../../../components/FlexibleHeader";
import TapBar from "../../../components/TapBar";
import Swal from "sweetalert2";
import {
  StWrapTR,
  StTeamFormTR,
  InputBoxTR,
  InputTextTR,
  TeamLayoutTR,
  SportsLayout,
  BtnTR,
  SpotsLabel,
  FootballInput,
  TennisInput,
  BadmintonInput,
  FootballDiv,
  TennisDiv,
  BadmintonDiv,
  PlusBtnTR,
  MinusBtnTR,
  CountBoxTR,
  ImageUpload,
  HostingPhotoUpload,
  HostPreview,
  Preview,
  ProfilePhotoInput,
} from "./Styles";
const TeamRegister = () => {
  const title = "나의 팀";
  const navigate = useNavigate();

  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);

  const nameRef = useRef();
  const [sports, setSports] = useState("");
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

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

  if (!token) {
    Swal.fire({
      text: "팀 등록은 로그인 후에 가능합니다",
      width: "300px",
      confirmButtonText: "확인",
      confirmButtonColor: "#40d295",
      showClass: { popup: "animated fadeInDown faster" },
      hideClass: { popup: "animated fadeOutUp faster" },
    }).then((result) =>{
      if (result.isConfirmed) {
        navigate('/login');
      }
    })
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    if (nameRef.current.value.trim() === "" || sports === "" || count === "") {
      return Swal.fire({
        text: "모든 항목을 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else if (count === 0 || count === 1) {
      Swal.fire({
        text: "팀 등록은 2명부터 가능합니다",
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
              text: "팀 등록이 완료되었습니다",
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
              text: "중복된 팀 이름입니다",
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
      <StWrapTR>
        <StTeamFormTR onSubmit={registerHandler} enctype="multipart/form-data">
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
          <InputBoxTR>
            <TeamLayoutTR>
              <div>팀이름</div>
              <InputTextTR
                type="text"
                maxLength="10"
                placeholder="team name"
                ref={nameRef}
              />
            </TeamLayoutTR>
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
            <TeamLayoutTR>
              <div>인원</div>
              {count === 0 ? (
                <MinusBtnTR disabled>-</MinusBtnTR>
              ) : (
                <MinusBtnTR onClick={() => setCount(count - 1)}>-</MinusBtnTR>
              )}
              <CountBoxTR>{count}</CountBoxTR>
              <PlusBtnTR
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </PlusBtnTR>
            </TeamLayoutTR>
          </InputBoxTR>
          <BtnTR>등록하기</BtnTR>
        </StTeamFormTR>
      </StWrapTR>
      <TapBar />
    </Layout>
  );
};

export default TeamRegister;
