import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deletePrivateSpot,
  __getMyPrivateSpot,
} from '../../redux/modules/spotsSlice';
import {
  Btn,
  MyMatch,
  StWrap,
  SpotImage,
  SpotInfos,
  SpotIcons,
  ResisterBtn,
} from './Styles';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import FlexibleHeader from '../../components/FlexibleHeader';
import TapBar from '../../components/TapBar';

const HostList = () => {
  const title = 'My Spots';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, []);
  const placeList = useSelector((state) => state.spots.myPrivateSpot);
  
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        {placeList?.map((place) => {
          return (
            <MyMatch
              onClick={() => {
                navigate(`/hostdetail/${place.placesId}`);
              }}
              key={place?.placesId}>
              <SpotImage>
                <img src={place?.image} />
              </SpotImage>
              <SpotInfos>
                <div>{place?.spotName}</div>
                <div>
                  {place?.address?.split(' ')[0]}{' '}
                  {place?.address?.split(' ')[1]}{' '}
                  {place?.address?.split(' ')[2]}
                </div>
                <div> {place?.spotKind} </div>
              </SpotInfos>
              <SpotIcons>
                <div>
                  {place?.sports === '배드민턴장' ? (
                    <>
                      <img src='/host_badminton.png' />
                    </>
                  ) : null}
                  {place?.sports === '풋살장' ? (
                    <>
                      <img src='/host_football.png' />
                    </>
                  ) : null}
                  {place?.sports === '테니스장' ? (
                    <>
                      <img src='/host_tennis.png' />
                    </>
                  ) : null}
                </div>
                <div
                  onClick={
                    () => {
                    navigate(`/hostdetail/${place.placesId}`);
                  }
                }
                  >
                  <img src='/more.png' />
                </div>
              </SpotIcons>
            </MyMatch>
          );
        })}

        <ResisterBtn onClick={() => navigate(`/hosting`)}>
          <div>
            <img src='/plus_icon.png' />
          </div>
          <div>나의 스팟 등록하기</div>
        </ResisterBtn>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default HostList;
