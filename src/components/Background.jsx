import styled from 'styled-components';

const BackGround = () => {
  return (
    <>
      <Image />
      <Logo src="/etc/background-logo.png" />
      <Members>
        <span>FE</span> 김미래 고은비 김수연 &nbsp; &nbsp;  <span>BE</span> 서주리 임다혜 정우성 &nbsp;
        &nbsp;  <span>UX|UI</span> 하은진
      </Members>
    </>
  );
};
export default BackGround;

const Image = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url('/etc/background-map.png');
  background-position: center bottom;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const Logo = styled.img`
  width: 20%;
  position: fixed;
  background-repeat: no-repeat;
  top: 40%;
  left: 10%;
`;

const Members = styled.div`
  font-size: 16px;
  color: #636363;
  line-height: 165%;
  position: fixed;
  bottom: 3%;
  right: 3%;

  span{
    font-weight: 600;
  }
`;
