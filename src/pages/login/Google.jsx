import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { LoginAPI } from "../../tools/instance";

const Google = () => {
  const navigate = useNavigate();
  const PARAMS = new URL(document.location).searchParams;
  const GOOGLE_CODE = PARAMS.get("code");
  console.log(GOOGLE_CODE);
  useEffect(() => {
    LoginAPI.googleLogin(GOOGLE_CODE)
      .then((res) => {
        console.log(res);
        if (res.data.code === -1) {
          localStorage.setItem("loginId", res.data.loginId);
          navigate(`/addlogin`);
        }
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          navigate(`/`);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Loading />
    </>
  );
};
export default Google;
