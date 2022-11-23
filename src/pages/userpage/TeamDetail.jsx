import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import {
  StWrap,
  TeamPhoto,
  StTeamForm,
  PageDesc,
  InfoLayout,
  Image,
} from "./Styles";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";
import styled from "styled-components";

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
    UserpageAPI.deleteTeam(teamId)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("팀 삭제가 완료 되었습니다!");
          navigate("/userpage");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          alert("가입 되지 않은 팀 입니다!");
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
                <img alt="팀 프로필" src={teamdetail.image} />
              </Image>
              <InputBox>
                <TeamLayout>
                  <div>팀이름</div>
                  <div>{teamdetail.teamName}</div>
                </TeamLayout>
                <TeamLayout>
                  <div>선호운동</div>
                  <div>
                    {teamdetail.sports === "football" ? (
                      <img alt="football" src="/mypage/football_blue.png" />
                    ) : teamdetail.sports === "tennis" ? (
                      <img alt="tennis" src="/mypage/tennis_blue.png" />
                    ) : (
                      <img alt="badminton" src="/mypage/badminton_blue.png" />
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
              <TeamPhoto>
                <img alt="팀 프로필" src={teamdetail.image} />
              </TeamPhoto>
              <p>
                <div> teamName : {teamdetail.teamName}</div>
              </p>
              <p>
                member :
                <input
                  type="number"
                  min="1"
                  defaultValue={teamdetail.member}
                  ref={memberRef}
                />
                <button
                  onClick={() => {
                    UserpageAPI.patchMyTeam({
                      teamName: teamdetail.teamName,
                      newMember: memberRef.current.value,
                    })
                      .then((res) => {
                        console.log(res);
                        if (res.status === 201) {
                          alert("수정이 완료되었습니다.");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 403) {
                          alert("수정 권한이 없습니다.");
                        }
                      });
                    setIsEdit(false);
                  }}
                >
                  수정하기
                </button>
              </p>
              admin:
              <input
                type="text"
                defaultValue={teamdetail.admin}
                ref={adminRef}
              />
              <button
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
                        alert("admin은 가입한 회원에게만 위임할 수 있습니다.");
                      }
                    });
                }}
              >
                수정하기
              </button>
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

const TeamLayout = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
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
`;
