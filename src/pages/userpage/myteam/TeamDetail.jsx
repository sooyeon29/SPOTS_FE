import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import {
  __getMyteamDetail,
  __getMyteamList,
} from "../../../redux/modules/userSlice";
import { UserpageAPI } from "../../../tools/instance";
import Layout from "../../../components/Layout";
import FlexibleHeader from "../../../components/FlexibleHeader";
import TapBar from "../../../components/TapBar";
import Swal from "sweetalert2";
import {
  StWrap,
  InputBox,
  InputText,
  TeamLayout,
  Btn,
  SaveBtn,
  PlusBtn,
  MinusBtn,
  CountBox,
  StTeamForm,
  Image,
} from "./Styles";

const TeamDetail = () => {
  const title = "나의 팀";
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminRef = useRef();
  const { teamdetail } = useSelector((state) => state.user);
  const [isEdit, setIsEdit, clickEditMode] = useToggle();
  const [count, setCount] = useState(0);

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
      .then(() => dispatch(__getMyteamList()))
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
        } else if (error.response.status === 403) {
          Swal.fire({
            text: "예약 내역이 있을경우, 팀 삭제를 할 수 없습니다.",
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
                  <div>관리자</div>
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
              <InputBox>
                <TeamLayout>
                  <div>팀 이름</div>
                  <div>{teamdetail.teamName}</div>
                </TeamLayout>
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
                <TeamLayout>
                  <div>관리자</div>
                  <InputText
                    type="text"
                    defaultValue={teamdetail.admin}
                    ref={adminRef}
                  />
                </TeamLayout>
              </InputBox>
              <SaveBtn
                onClick={() => {
                  UserpageAPI.patchMyTeam({
                    teamName: teamdetail.teamName,
                    newMember: count,
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
                      if (err.response.status === 403) {
                        Swal.fire({
                          text: "수정 권한이 없습니다.",
                          width: "300px",
                          confirmButtonText: "확인",
                          confirmButtonColor: "#40d295",
                          showClass: { popup: "animated fadeInDown faster" },
                          hideClass: { popup: "animated fadeOutUp faster" },
                        });
                      } else if (err.response.status === 400) {
                        Swal.fire({
                          text: "관리자 위임은 가입한 회원에게만 가능합니다.",
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
                수정하기
              </SaveBtn>
            </>
          )}
        </StTeamForm>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default TeamDetail;
