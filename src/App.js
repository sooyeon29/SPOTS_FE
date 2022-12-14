import BackGround from "./components/Background";
import Router from "./shared/router";

const App = ({ props }) => {
  // 배포 환경에서 console.log, console.warn 지우기
  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  const getParametersForUnsplash = ({ width, height, quality, format }) => {
    return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
  };

  <img
    src={
      props +
      getParametersForUnsplash({
        width: 140,
        height: 140,
        quality: 80,
        format: "png",
      })
    }
    alt="thumbnail"
  />;

  return (
    <>
      <BackGround />
      <Router />
    </>
  );
};

export default App;
