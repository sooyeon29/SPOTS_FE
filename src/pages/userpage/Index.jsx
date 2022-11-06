import React from "react";
import MyPage from "./MyPage";
import TeamPage from "./TeamPage";
import MyToggle from "./toggle/MyToggle";
import TeamToggle from "./toggle/TeamToggle";
import { StContainer } from "./Styles";
import useToggle from "../../hooks/useToggle";

const Index = () => {
  const [myToggle, setMyToggle, myClickToggle] = useToggle();
  const [teamToggle, setTeamToggle, teamClickToggle] = useToggle();

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
    </StContainer>
  );
};

export default Index;
