import styled from "styled-components";

const BackGround = () => {
  return <Image alt="" src="/background.jpg" />;
};
export default BackGround;

const Image = styled.img`
  height: 100%;
  width: 100%;
  /* height: 960px; */
  object-fit: contain;
  z-index: -1;
  position: fixed;
`;
