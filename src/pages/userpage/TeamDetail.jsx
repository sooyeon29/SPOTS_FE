import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { __getMyteamDetail } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import { StContainer, StWrap } from "./Styles";

const TeamDetail = () => {
  const { teamdetail } = useSelector((state) => state.user);
  console.log(teamdetail);

  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(__getMyteamDetail(id));
  }, [dispatch, id]);

  const dropTeam = (teamName) => {
    console.log(teamName);
    UserpageAPI.deleteTeam({ teamName: teamName })
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
          <img alt="팀 프로필" src={teamdetail.image} />
          <div>{teamdetail.teamName}</div>
          <div>{teamdetail.sports}</div>
          <div>{teamdetail.member}</div>
          <div>
            {teamdetail.wins}승 / {teamdetail.lose}패
          </div>
          <div>score: {teamdetail.score}</div>
          <div>admin: {teamdetail.admin}</div>
          <button>수정하기</button>
          <button
            onClick={() => {
              dropTeam(teamdetail.teamName);
              console.log(teamdetail.teamName);
            }}
          >
            삭제하기
          </button>
        </StWrap>
      </StContainer>
    </>
  );
};

export default TeamDetail;
