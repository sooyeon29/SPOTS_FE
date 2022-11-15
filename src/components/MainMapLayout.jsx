import styled from "styled-components";

const MainMapLayout = ({ children }) => {
  return (
    <>
      <Wrap>{children}</Wrap>
    </>
  );
};

export default MainMapLayout;

const Wrap = styled.div`
  background-color: #afd0ec;
  width: 90%;
  max-width: 1116px;
  padding-bottom: 30px;
  top: 343px;
`;
