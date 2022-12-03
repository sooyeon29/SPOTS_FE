import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import { StWrap, StTeamForm, Image } from "./Styles";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";
import Swal from "sweetalert2";

const TeamDetail = () => {
  const title = "My Team";
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberRef = useRef();
  const adminRef = useRef();
  const { teamdetail } = useSelector((state) => state.user);
  const [isEdit, setIsEdit, clickEditMode] = useToggle();
  const [count, setCount] = useState(`${teamdetail.member}`);

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
          Swal.fire({
            text: "팀 삭제가 완료되었습니다.",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          Swal.fire({
            text: "해당 팀이 존재하지 않습니다.",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        {/* <PageDesc>팀 상세페이지</PageDesc> */}
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
                {/* <InputText
                  type="number"
                  min="1"
                  defaultValue={teamdetail.member}
                  ref={memberRef}
                /> */}
                <MinusBtn
                  onClick={() => {
                    setCount(count - 1);
                  }}
                >
                  -
                </MinusBtn>
                <CountBox>{count}</CountBox>
                <PlusBtn
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  +
                </PlusBtn>
                <EditBtn
                  onClick={() => {
                    UserpageAPI.patchMyTeam({
                      teamName: teamdetail.teamName,
                      newMember: memberRef.current.value,
                    })
                      .then((res) => {
                        console.log(res);
                        if (res.status === 201) {
                          Swal.fire({
                            text: "수정이 완료되었습니다.",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: { popup: "animated fadeInDown faster" },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
                        }
                      })
                      .then(() => dispatch(__getMyteamDetail(id)))
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 403) {
                          Swal.fire({
                            text: "수정 권한이 없습니다.",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: { popup: "animated fadeInDown faster" },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
                        }
                      });
                    setIsEdit(false);
                  }}
                >
                  저장
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
                          Swal.fire({
                            text: "수정이 완료되었습니다.",
                            width: "300px",
                            confirmButtonText: "확인",
                            confirmButtonColor: "#40d295",
                            showClass: { popup: "animated fadeInDown faster" },
                            hideClass: { popup: "animated fadeOutUp faster" },
                          });
                        }
                      })
                      .then(() => dispatch(__getMyteamDetail(id)))
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                          Swal.fire({
                            text: "admin은 가입한 회원에게만 위임할 수 있습니다.",
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
                  저장
                </EditBtn>
              </TeamLayout>
              <SaveBtn>수정 완료</SaveBtn>
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
  border-radius: 8px;
  font-size: 18px;
  padding-left: 10px;
  width: 170px;
  height: 30px;
  margin-right: 20px;
  border: 1px solid #cecece;
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
  margin-top: 50px;
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
`;

const MinusBtn = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 20px;
  color: #231f20;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
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
  //margin-right: -30px;
  z-index: 1;
`;
