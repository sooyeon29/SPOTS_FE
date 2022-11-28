import { useEffect } from "react";
import { LoginAPI } from "../../tools/instance";

const Google = () => {
  const PARAMS = new URL(document.location).searchParams;
  const GOOGLE_CODE = PARAMS.get("code");
  console.log(GOOGLE_CODE);
  useEffect(() => {
    LoginAPI.googleLogin(GOOGLE_CODE)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  return <>...로딩중</>;
};
export default Google;
