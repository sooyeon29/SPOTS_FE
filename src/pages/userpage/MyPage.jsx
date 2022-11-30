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
  const title = "My Profile";
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

  const {
    register,
    watch,
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

  // const nickRef = useRef();
  // const phoneRef = useRef();

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
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc>내 정보</PageDesc>
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
                      <img src="/mypage/football_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/football_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes("tennis") ? (
                    <>
                      <img src="/mypage/tennis_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/tennis_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.sports?.includes("badminton") ? (
                    <>
                      <img src="/mypage/badminton_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/badminton_gray.png" />
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
                      <img src="/mypage/baseball_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/baseball_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("basketball") ? (
                    <>
                      <img src="/mypage/basketball_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/basketball_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("swim") ? (
                    <>
                      <img src="/mypage/swimming_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/swimming_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("running") ? (
                    <>
                      <img src="/mypage/running_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/running_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("golf") ? (
                    <>
                      <img src="/mypage/golf_blue.png" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/golf_gray.png" />
                    </>
                  )}
                </div>
                <div>
                  {user?.favSports?.includes("health") ? (
                    <>
                      <img src="/mypage/health_blue.jpg" />
                    </>
                  ) : (
                    <>
                      <img src="/mypage/health_gray.jpg" />
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
                      SignUpAPI.checkNickname({ nickname: nickName })
                        .then((res) => {
                          console.log(res);
                          if (res.status === 200) {
                            Swal.fire({
                              text: "사용 가능한 닉네임입니다.",
                              width: "300px",
                              confirmButtonText: "확인",
                              confirmButtonColor: "#40d295",
                              showClass: {
                                popup: "animated fadeInDown faster",
                              },
                              hideClass: { popup: "animated fadeOutUp faster" },
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
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </ModifyBlock>
              <ModifyBlock>
                <div>휴대폰 번호</div>
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
                  {errors.phone && errors.phone.type === "required" && (
                    <p>휴대폰 번호를 입력해주세요</p>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <p>10~11자리의 번호를 입력해주세요</p>
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
                <div>
                  {!codeSent ? (
                    <button
                      type="button"
                      onClick={() => {
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
                </div>
              </ModifyBlock>
              <ModifyBlock>
                <div>비밀전호 변경</div>
                <div>
                  <input
                    type="password"
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="비밀번호"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p>✓ 비밀번호를 입력해주세요</p>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <p>✓ 영문과 숫자 조합으로 6글자 이상을 입력해주세요</p>
                  )}
                  <input
                    type="password"
                    onChange={(e) => setCheckPw(e.target.value)}
                    placeholder="비밀번호 확인"
                    required
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === password.current,
                    })}
                  />
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <p>✓ 다시 한번 비밀번호를 입력해주세요</p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <p>✓ 비밀번호가 일치하지 않습니다</p>
                    )}
                </div>
              </ModifyBlock>
            </ModifyDiv>
            <ModifyBtns>
              <button
                onClick={() => {
                  clickEditMode();
                  UserpageAPI.patchMyInfo({
                    password: pw,
                    confirmPass: checkPw,
                    nickname: nickName,
                    phone: phone,
                  });
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
