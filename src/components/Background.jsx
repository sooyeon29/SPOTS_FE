import styled from "styled-components";

const BackGround = () => {
  return <Image alt="" src="/background.png" />;
};
export default BackGround;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: -1;
  position: fixed;
`;
