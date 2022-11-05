import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      Header!!!!
      <button onClick={() => navigate(`/login`)}>로그인</button>
    </div>
  );
};

export default Header;
