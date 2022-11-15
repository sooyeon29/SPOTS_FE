import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerWrap>
      <Img src='/mainBanner.jpg' alt='main banner' />
    </BannerWrap>
  );
};

export default Banner;

const BannerWrap = styled.div`
  width: 100%;
  /* height: 227px; */

  /* top: 72px; */
  /* background-color: #f1f1f1; */
`;

const Img = styled.img`
    width: 100%;
`