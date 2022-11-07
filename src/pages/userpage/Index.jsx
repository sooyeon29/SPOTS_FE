import React from "react";
import MyPage from "./MyPage";
import TeamPage from "./TeamPage";
import MyToggle from "./toggle/MyToggle";
import TeamToggle from "./toggle/TeamToggle";
import { StContainer } from "./Styles";
import useToggle from "../../hooks/useToggle";
import ReservPage from "./ReservPage";
import ReservToggle from "./toggle/ReservToggle";

const UserPage = () => {
  const [myToggle, setMyToggle, myClickToggle] = useToggle();
  const [teamToggle, setTeamToggle, teamClickToggle] = useToggle();
  const [reservToggle, setReservToggle, reservClickToggle] = useToggle();

  return (
    <StContainer>
      {!myToggle ? (
        <MyPage myToggle={myToggle} myClickToggle={myClickToggle} />
      ) : (
        <MyToggle myToggle={myToggle} myClickToggle={myClickToggle} />
      )}
      {!teamToggle ? (
        <TeamToggle teamToggle={teamToggle} teamClickToggle={teamClickToggle} />
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
    </StContainer>
  );
};

export default UserPage;
