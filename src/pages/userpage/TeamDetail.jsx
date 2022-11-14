import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import useToggle from "../../hooks/useToggle";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import { StContainer, StWrap } from "./Styles";

const TeamDetail = () => {
  const { id } = useParams();
  const { teamdetail } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memberRef = useRef();
  const adminRef = useRef();
  const [isEdit, setIsEdit, clickEditMode] = useToggle();

  useEffect(() => {
    dispatch(__getMyteamDetail(id));
  }, [dispatch, id]);

  const dropTeam = (teamId) => {
    console.log(teamId);
    UserpageAPI.deleteTeam(teamId)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("팀 삭제가 완료 되었습니다!");
          navigate("/userpage");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          alert("가입 되지 않은 팀 입니다!");
        }
      });
  };

  return (
    <>
      <Header />
      <StContainer>
        <StWrap>
          {!isEdit ? (
            <>
              <img alt="팀 프로필" src={teamdetail.image} />
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
              <img alt="팀 프로필" src={teamdetail.image} />
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
                        if (res.status === 200) {
                          alert("수정이 완료되었습니다.");
                          window.location.reload();
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                          alert("수정 권한이 없습니다.");
                        }
                      });
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
                      if (res.status === 200) {
                        alert("수정이 완료되었습니다.");
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      if (err.response.status === 500) {
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
      </StContainer>
    </>
  );
};

export default TeamDetail;
