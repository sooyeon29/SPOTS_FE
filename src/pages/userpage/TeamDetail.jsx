import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import { StWrap, StTeamForm, PageDesc, Image } from "./Styles";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";
import Swal from "sweetalert2";

const TeamDetail = () => {
  const title = "TeamPage";
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberRef = useRef();
  const adminRef = useRef();
  const { teamdetail } = useSelector((state) => state.user);
  const [isEdit, setIsEdit, clickEditMode] = useToggle();

  useEffect(() => {
    dispatch(__getMyteamDetail(id));
  }, [dispatch, id]);

  const dropTeam = (teamId) => {
    console.log(teamId);
    navigate("/teampage");
    UserpageAPI.deleteTeam(teamId)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
<<<<<<< HEAD
          alert("팀 삭제가 완료되었습니다");
          navigate("/userpage");
=======
          Swal.fire({
            text: "팀 삭제가 완료되었습니다.",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
>>>>>>> 263e39152e2f79102a2b0104849d367d95700f6c
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
<<<<<<< HEAD
          alert("가입되지 않은 팀입니다");
=======
          //navigate("/teampages");
          Swal.fire({
            text: "해당 팀이 존재하지 않습니다.",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
>>>>>>> 263e39152e2f79102a2b0104849d367d95700f6c
        }
      });
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc>팀 상세페이지</PageDesc>
        <StTeamForm>
          {!isEdit ? (
            <>
              <Image>
                {teamdetail.image === null ? (
                  <img alt="spots" src="/myprofile_logo.png" />
                ) : (
                  <img alt="팀 프로필" src={teamdetail.image} />
                )}
              </Image>
              <InputBox>
                <TeamLayout>
                  <div>팀이름</div>
                  <div>{teamdetail.teamName}</div>
                </TeamLayout>
                <TeamLayout>
                  <div>운동</div>
                  <div>
                    {teamdetail.sports === "풋살장" ? (
                      <img alt="풋살" src="/mypage/football_blue.png" />
                    ) : teamdetail.sports === "테니스장" ? (
                      <img alt="테니스" src="/mypage/tennis_blue.png" />
                    ) : (
                      <img alt="배드민턴" src="/mypage/badminton_blue.png" />
                    )}
                  </div>
                </TeamLayout>
                <TeamLayout>
                  <div>인원</div>
                  <div>{teamdetail.member}명</div>
                </TeamLayout>
                <TeamLayout>
                  <div>성적</div>
                  <div>
                    {teamdetail.wins}승 / {teamdetail.lose}패
                  </div>
                </TeamLayout>
                <TeamLayout>
                  <div>admin</div>
                  <div>{teamdetail.admin}</div>
                </TeamLayout>
              </InputBox>
              <Btn onClick={clickEditMode}>수정</Btn>
              <Btn
                onClick={() => {
                  dropTeam(teamdetail.teamId);
                  console.log(teamdetail.teamId);
                }}
              >
                삭제하기
              </Btn>
            </>
          ) : (
            <>
              <Image>
                {teamdetail.image === null ? (
                  <img alt="spots" src="/myprofile_logo.png" />
                ) : (
                  <img alt="팀 프로필" src={teamdetail.image} />
                )}
              </Image>
              <TeamLayout>
                <div>팀이름</div>
                <div>{teamdetail.teamName}</div>
              </TeamLayout>
              <TeamLayout>
                <div>인원</div>
                <InputText
                  type="number"
                  min="1"
                  defaultValue={teamdetail.member}
                  ref={memberRef}
                />
                <EditBtn
                  onClick={() => {
                    UserpageAPI.patchMyTeam({
                      teamName: teamdetail.teamName,
                      newMember: memberRef.current.value,
                    })
                      .then((res) => {
                        console.log(res);
                        if (res.status === 201) {
<<<<<<< HEAD
                          alert("수정이 완료되었습니다");
=======
                          Swal.fire({
                            text: "수정이 완료되었습니다.",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: { popup: "animated fadeInDown faster" },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
                          dispatch(__getMyteamDetail(id));
>>>>>>> 263e39152e2f79102a2b0104849d367d95700f6c
                        }
                        dispatch(__getMyteamDetail(id))
                      })
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 403) {
<<<<<<< HEAD
                          alert("수정 권한이 없습니다");
=======
                          Swal.fire({
                            text: "수정 권한이 없습니다.",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: { popup: "animated fadeInDown faster" },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
>>>>>>> 263e39152e2f79102a2b0104849d367d95700f6c
                        }
                      });
                    setIsEdit(false);
                  }}
                >
                  수정
                </EditBtn>
              </TeamLayout>
              <TeamLayout>
                <div>admin</div>
                <InputText
                  type="text"
                  defaultValue={teamdetail.admin}
                  ref={adminRef}
                />
                <EditBtn
                  onClick={() => {
                    UserpageAPI.patchMyTeam({
                      teamName: teamdetail.teamName,
                      newAdmin: adminRef.current.value,
                    })
                      .then((res) => {
                        console.log(res);
                        if (res.status === 201) {
                          alert("수정이 완료되었습니다.");
                          window.location.reload();
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                          alert(
                            "admin은 가입한 회원에게만 위임할 수 있습니다."
                          );
                        }
                      });
                  }}
                >
                  수정
                </EditBtn>
              </TeamLayout>
              <SaveBtn>저장</SaveBtn>
            </>
          )}
        </StTeamForm>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default TeamDetail;

const InputBox = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;

const InputText = styled.input`
  display: flex;
  border: none;
  font-size: 18px;
  padding-left: 20px;
  width: 100px;
  height: 20px;
  :focus {
    outline: none;
  }
`;

const TeamLayout = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-weight: 600;
  width: 94%;

  div:first-child {
    color: #545454;
    padding: 8px 8px 8px 30px;
    font-weight: 800;
    font-size: 18px;
    width: 30%;
  }

  div:last-child {
    margin-left: 20px;
    font-size: 18px;
    img {
      width: 53px;
      height: 53px;
      border-radius: 10px;
      margin: 0;
    }
  }
`;

const Btn = styled.button`
  width: 90%;
  height: 52px;
  background-color: #cecece;
  border: none;
  border-radius: 47px;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const EditBtn = styled.button`
  border: none;
  background-color: #cecece;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const SaveBtn = styled.button`
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
