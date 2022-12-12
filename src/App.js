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
        width: 240,
        height: 240,
        quality: 80,
        format: "jpg",
      })
    }
    alt="thumbnail"
  />;

  return (
    <>
      <Router />
    </>
  );
};

export default App;
