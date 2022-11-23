import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import { StWrap, TeamPhoto, StTeamForm, PageDesc, InfoLayout } from "./Styles";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import TapBar from "../../components/TapBar";

const TeamDetail = () => {
  const title = "Team Page";
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
        {!isEdit ? (
          <>
            <TeamPhoto>
              <img alt="팀 프로필" src={teamdetail.image} />
            </TeamPhoto>
            <div>{teamdetail.teamName}</div>
            <div>{teamdetail.sports}</div>
            <div>{teamdetail.member}</div>
            <div>
              {teamdetail.wins}승 / {teamdetail.lose}패
            </div>
            <div>score: {teamdetail.score}</div>
            <div>admin: {teamdetail.admin}</div>
            <button onClick={clickEditMode}>수정하기</button>
            <button
              onClick={() => {
                dropTeam(teamdetail.teamId);
                console.log(teamdetail.teamId);
              }}
            >
              삭제하기
            </button>
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
            <input type="text" defaultValue={teamdetail.admin} ref={adminRef} />
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
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default TeamDetail;
