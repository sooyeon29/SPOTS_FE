import React, { useEffect, useRef, useState } from "react";
import {
  StWrap,
  PageDesc,
  Image,
  InfoLayout,
  SportsLayout,
  SportBlock,
  SportTitle,
  ModifyBtn,
  NickName,
  ProfilePhotoInput,
  ProfilePhotoUpload,
  ModifyDiv,
  SaveImage,
  ModifyBlock,
  ModifyBtns,
} from "./Styles";
import useToggle from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/userSlice";
import { LoginAPI, SignUpAPI, UserpageAPI } from "../../tools/instance";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import useInput from "../../hooks/useInput";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyPage = () => {
  const title = "내 정보";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);
  const [nickName, setNickName] = useInput();
  const [phone, setPhone] = useInput();
  const [pw, setPw] = useInput();
  const [checkPw, setCheckPw] = useInput();
  const [code, setCode] = useInput();
  const [codeSent, setCodeSent, codeSentHandler] = useToggle();
  const pwRex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const password = useRef();
  password.current = watch("password");

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  const { user } = useSelector((state) => state?.user);
  // console.log(user);

  const [isEdit, setIsEdit, clickEditMode] = useToggle();
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

  const savePhoto = () => {
    const sendFD = new FormData();
    sendFD.append("image", img);

    // for (let a of sendFD.entries()) {
    //   console.log("formData출력", a);
    // }

    // if (sendFD[1] === null) {
    //   Swal.fire({
    //     text: "사진을 등록해주세요.",
    //     width: "300px",
    //     confirmButtonText: "확인",
    //     confirmButtonColor: "#40d295",
    //     showClass: { popup: "animated fadeInDown faster" },
    //     hideClass: { popup: "animated fadeOutUp faster" },
    //   });
    // }
    UserpageAPI.patchMyPhoto(sendFD)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: "프로필 사진이 수정되었습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        dispatch(__getMyInfo());
      })

      .catch((err) => console.log(err));
  };
  // console.log("마이페이지유저", user);
  const passwordHandler = (data) => {
    console.log(data);
  };
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc></PageDesc>
        {!isEdit ? (
          <div>
            <Image>
              <img alt="기본프로필사진" src={user?.profileImg} />
            </Image>
            <InfoLayout>
              <div>닉네임</div>
              <NickName>{user?.nickname}</NickName>
              <ModifyBtn onClick={clickEditMode}>프로필 수정</ModifyBtn>
            </InfoLayout>
            <InfoLayout>
              <div>성별</div>
              <div>{user.gender}</div>
            </InfoLayout>
            <InfoLayout>
              <div>휴대폰 번호</div>
              <div>
                {user?.phone?.substr(0, 3)} - {user?.phone?.substr(3, 4)} -{" "}
                {user?.phone?.substr(7)}
              </div>
            </InfoLayout>
            <SportsLayout>
              <SportTitle>나의 운동</SportTitle>
              <SportBlock>
                <div>
                  {user?.sports?.includes("football") ? (
                    <>
                      <img
                        alt="football_blue"
                        src="/mypage/football_blue.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="football_gray"
                        src="/mypage/football_gray.png"
                      />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes("tennis") ? (
                    <>
                      <img alt="tennis_blue" src="/mypage/tennis_blue.png" />
                    </>
                  ) : (
                    <>
                      <img alt="tennis_gray" src="/mypage/tennis_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes("badminton") ? (
                    <>
                      <img
                        alt="badminton_blue"
                        src="/mypage/badminton_blue.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="badminton_gray"
                        src="/mypage/badminton_gray.png"
                      />
                    </>
                  )}
                </div>
              </SportBlock>
            </SportsLayout>
            <SportsLayout>
              <SportTitle>관심 운동</SportTitle>
              <SportBlock>
                <div>
                  {user?.favSports?.includes("baseball") ? (
                    <>
                      <img
                        alt="baseball_blue"
                        src="/mypage/baseball_blue.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="baseball_gray"
                        src="/mypage/baseball_gray.png"
                      />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("basketball") ? (
                    <>
                      <img
                        alt="basketball_blue"
                        src="/mypage/basketball_blue.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="basketball_gray"
                        src="/mypage/basketball_gray.png"
                      />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("swim") ? (
                    <>
                      <img
                        alt="swimming_blue"
                        src="/mypage/swimming_blue.png"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        alt="swimming_gray"
                        src="/mypage/swimming_gray.png"
                      />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("running") ? (
                    <>
                      <img alt="running_blue" src="/mypage/running_blue.png" />
                    </>
                  ) : (
                    <>
                      <img alt="running_gray" src="/mypage/running_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("golf") ? (
                    <>
                      <img alt="golf_blue" src="/mypage/golf_blue.png" />
                    </>
                  ) : (
                    <>
                      <img alt="golf_gray" src="/mypage/golf_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("health") ? (
                    <>
                      <img alt="health_blue" src="/mypage/health_blue.jpg" />
                    </>
                  ) : (
                    <>
                      <img alt="health_gray" src="/mypage/health_gray.jpg" />
                    </>
                  )}
                </div>
              </SportBlock>
            </SportsLayout>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Image>
              {preview.length > 0 ? (
                <img key={1} src={preview} alt="미리보기" />
              ) : (
                <img alt="기본프로필사진" src={user.profileImg} />
              )}
            </Image>
            <ProfilePhotoUpload>
              <label htmlFor="upload-input">
                <div>+</div>
              </label>
              <ProfilePhotoInput
                id="upload-input"
                type="file"
                onChange={(e) => {
                  handleImagePreview(e);
                }}
                accept="image/*"
              />
            </ProfilePhotoUpload>
            <SaveImage onClick={savePhoto}>프로필 이미지 저장</SaveImage>
            <ModifyDiv>
              <ModifyBlock>
                <div>닉네임</div>
                <div>
                  <input
                    type="text"
                    defaultValue={user.nickname}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      if (nickName?.trim() === "") {
                        Swal.fire({
                          text: "한 글자 이상 입력해주세요",
                          width: "300px",
                          confirmButtonText: "확인",
                          confirmButtonColor: "#40d295",
                          showClass: {
                            popup: "animated fadeInDown faster",
                          },
                          hideClass: {
                            popup: "animated fadeOutUp faster",
                          },
                        });
                        return;
                      } else {
                        SignUpAPI.checkNickname({ nickname: nickName })
                          .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                              Swal.fire({
                                text: "사용 가능한 닉네임입니다",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            Swal.fire({
                              text: "중복된 닉네임입니다",
                              width: "300px",
                              confirmButtonText: "확인",
                              confirmButtonColor: "#40d295",
                              showClass: {
                                popup: "animated fadeInDown faster",
                              },
                              hideClass: { popup: "animated fadeOutUp faster" },
                            });
                          });
                      }
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </ModifyBlock>
              <ModifyBlock>
                <div>휴대폰번호</div>
                <div>
                  <input
                    type="text"
                    defaultValue={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                    required
                    minLength={10}
                    placeholder="01012345678"
                    autoComplete="off"
                  />
                  {!codeSent ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (phone?.length < 11) {
                          Swal.fire({
                            text: "10자리 이상의 번호를 입력해주세요",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: {
                              popup: "animated fadeInDown faster",
                            },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
                          return;
                        }
                        codeSentHandler();
                        LoginAPI.postforVCode({ phone: phone })
                          .then((res) => {
                            console.log(res);
                            Swal.fire({
                              text: "인증번호가 전송되었습니다",
                              width: "300px",
                              confirmButtonText: "확인",
                              confirmButtonColor: "#40d295",
                              showClass: {
                                popup: "animated fadeInDown faster",
                              },
                              hideClass: { popup: "animated fadeOutUp faster" },
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            if (err.response.status === 412) {
                              Swal.fire({
                                text: "이미 가입된 휴대폰 번호입니다",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                              return;
                            } else {
                              Swal.fire({
                                text: "유효하지 않은 휴대폰 번호입니다",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                              return;
                            }
                          });
                      }}
                    >
                      인증하기
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        LoginAPI.postforVCode({ phone: phone })
                          .then((res) => {
                            if (phone?.length < 10) {
                              Swal.fire({
                                text: "10자리 이상의 번호를 입력해주세요",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                              return;
                            }
                            console.log(res);
                            Swal.fire({
                              text: "인증번호가 전송되었습니다",
                              width: "300px",
                              confirmButtonText: "확인",
                              confirmButtonColor: "#40d295",
                              showClass: {
                                popup: "animated fadeInDown faster",
                              },
                              hideClass: { popup: "animated fadeOutUp faster" },
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            if (err.response.status === 412) {
                              Swal.fire({
                                text: "이미 가입된 휴대폰 번호입니다",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                              return;
                            } else {
                              Swal.fire({
                                text: "유효하지 않은 휴대폰 번호입니다",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                              return;
                            }
                          })
                      }
                    >
                      다시받기
                    </button>
                  )}
                  {codeSent && (
                    <div>
                      <input
                        placeholder="인증번호를 입력하세요"
                        type="text"
                        required
                        name="code"
                        autoComplete="off"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          LoginAPI.postforCheckVCode({ code, phone })
                            .then((res) => {
                              console.log(res);
                              if (res.status === 200) {
                                Swal.fire({
                                  text: "인증이 완료되었습니다",
                                  width: "300px",
                                  confirmButtonText: "확인",
                                  confirmButtonColor: "#40d295",
                                  showClass: {
                                    popup: "animated fadeInDown faster",
                                  },
                                  hideClass: {
                                    popup: "animated fadeOutUp faster",
                                  },
                                });
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                              // if(err.response.data === 401)
                              Swal.fire({
                                text: "인증 번호를 다시 확인해주세요",
                                width: "300px",
                                confirmButtonText: "확인",
                                confirmButtonColor: "#40d295",
                                showClass: {
                                  popup: "animated fadeInDown faster",
                                },
                                hideClass: {
                                  popup: "animated fadeOutUp faster",
                                },
                              });
                            });
                        }}
                      >
                        인증확인
                      </button>
                    </div>
                  )}
                </div>
              </ModifyBlock>
              <ModifyBlock>
                <div>비밀번호</div>
                <form onSubmit={handleSubmit(passwordHandler)}>
                  <div>
                    <input
                      type="password"
                      onChange={(e) => setPw(e.target.value)}
                      placeholder="비밀번호"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={(e) => setCheckPw(e.target.value)}
                      placeholder="비밀번호 확인"
                      required
                    />
                  </div>
                </form>
              </ModifyBlock>
            </ModifyDiv>
            <ModifyBtns>
              <button
                onClick={() => {
                  // if (pw !== checkPw) {
                  //   return alert("비밀번호가 일치하지 않습니다");
                  // }
                  // if (!pwRex.test(pw)) {
                  //   return alert(
                  //     "비밀번호는 숫자와 영문을 혼합하여 6자리 이상 입력해주세요"
                  //   );
                  // }
                  clickEditMode();
                  UserpageAPI.patchMyInfo({
                    password: pw,
                    confirmPassword: checkPw,
                    nickname: nickName,
                    phone: phone,
                  })
                    .then((res) => {
                      console.log("응답", res);
                      Swal.fire({
                        text: "수정이 완료되었습니다.",
                        width: "300px",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#40d295",
                        showClass: {
                          popup: "animated fadeInDown faster",
                        },
                        hideClass: {
                          popup: "animated fadeOutUp faster",
                        },
                      });
                    })
                    .then(() => dispatch(__getMyInfo()))
                    .catch((err) => console.log("err", err));
                }}
              >
                수정완료
              </button>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "탈퇴하시겠습니까?",
                    text: "30일간 휴면 후 개인정보가 삭제됩니다",
                    width: "350px",
                    showCancelButton: true,
                    confirmButtonColor: "#40d295",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "회원탈퇴",
                    cancelButtonText: "취소",
                    showClass: { popup: "animated fadeInDown faster" },
                    hideClass: { popup: "animated fadeOutUp faster" },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      UserpageAPI.dropOutMe({ loginId: user.ID })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            localStorage.clear();
                            navigate("/");
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          if (err.status === 400) {
                          }
                        });
                      Swal.fire({
                        text: "계정이 휴면 처리되었습니다",
                        width: "300px",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#40d295",
                        showClass: { popup: "animated fadeInDown faster" },
                        hideClass: { popup: "animated fadeOutUp faster" },
                      });
                    }
                  });
                }}
              >
                회원탈퇴
              </button>
            </ModifyBtns>
          </div>
        )}
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default MyPage;
