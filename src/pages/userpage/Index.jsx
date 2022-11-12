import React from "react";
import MyPage from "./MyPage";
import TeamPage from "./TeamPage";
import MyToggle from "./toggle/MyToggle";
import TeamToggle from "./toggle/TeamToggle";
import { StContainer } from "./Styles";
import useToggle from "../../hooks/useToggle";
import ReservPage from "./ReservPage";
import ReservToggle from "./toggle/ReservToggle";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import HostList from "./HostList";
import HostToggle from "./toggle/HostToggle";

const UserPage = () => {
  const navigate = useNavigate();
  const [myToggle, setMyToggle, myClickToggle] = useToggle();
  const [teamToggle, setTeamToggle, teamClickToggle] = useToggle();
  const [reservToggle, setReservToggle, reservClickToggle] = useToggle();
  const [hostToggle, setHostToggle, hostClickToggle] = useToggle();

  return (
    <>
      <Header />
      <StContainer>
        {!myToggle ? (
          <MyPage myToggle={myToggle} myClickToggle={myClickToggle} />
        ) : (
          <MyToggle myToggle={myToggle} myClickToggle={myClickToggle} />
        )}
        {!teamToggle ? (
          <TeamToggle
            teamToggle={teamToggle}
            teamClickToggle={teamClickToggle}
          />
        ) : (
          <TeamPage teamToggle={teamToggle} teamClickToggle={teamClickToggle} />
        )}
        {!reservToggle ? (
          <ReservToggle
            reservToggle={reservToggle}
            reservClickToggle={reservClickToggle}
          />
        ) : (
          <ReservPage
            reservToggle={reservToggle}
            reservClickToggle={reservClickToggle}
          />
        )}
        <button onClick={() => navigate("/hosting")}>구장 등록하기</button>
        {!hostToggle ? (
          <HostToggle
            hostToggle={hostToggle}
            hostClickToggle={hostClickToggle}
          />
        ) : (
          <HostList hostToggle={hostToggle} hostClickToggle={hostClickToggle} />
        )}
      </StContainer>
    </>
  );
};

export default UserPage;
