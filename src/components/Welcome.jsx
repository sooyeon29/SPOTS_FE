import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Layout from './Layout';
import TapBar from './TapBar';

const Welcome = () => {
    const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Wrap>
        <Img src='/welcome_image.png' />{' '}
      <Button onClick={()=>navigate('/login')}>로그인하러 가기</Button>
      </Wrap>
      <TapBar />
    </Layout>
  );
};

export default Welcome;

export const Wrap = styled.div`
display:flex;
justify-content: center;
    margin: auto;

`
export const Img = styled.img`
  margin-top: 62px;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Button = styled.button`
  margin:auto;
  position: absolute;
  top: 70%;
  background-color: transparent;
  color: black;
  margin-top: 100px;
  margin-bottom: 100px;
  z-index: 3;
  padding: 10px;
  border-radius: 20px;
  border-color: #1746C7;
  color: #FF00B4;
  width: 200px;
  font-weight: 700;
  cursor: pointer;
`;
