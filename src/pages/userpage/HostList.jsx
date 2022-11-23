import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  __deletePrivateSpot,
  __getMyPrivateSpot,
} from '../../redux/modules/spotsSlice';
import {
  AboutMySpot,
  Btn,
  ButWrap,
  ImageInfo,
  MyHostList,
  MyMatch,
  MySpot,
  SpotInfo,
  StWrap,
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
  console.log(placeList);

  const deleteHostHandler = (id) => {
    dispatch(__deletePrivateSpot(id));
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        {placeList?.map((place) => {
          return (
            <MyMatch key={place?.placesId}>
              <div>
                <img src={place?.image} />
              </div>
              <div>
                <div>
                  <div>{place?.spotName}</div>
                  <div>
                    {' '}
                    {place?.sports === '배드민턴장' ? (
                      <>
                        <img src='/host_badminton.png' />
                      </>
                    ) : null}
                  </div>
                </div>
                <div>{place?.address}</div>
                <div>{place?.spotKind}</div>
              </div>

              {/* <ImageInfo>
                <img alt="" src={place.image} />
                <MySpot>
                  <span>{place.spotName}</span>
                  <div>{place.address}</div>
                </MySpot>
              </ImageInfo>
              <MyHostList>
                <SpotInfo>
                  {place.sports === "풋살장" && (
                    <img alt="" src="/privateFutsal 2.png" />
                  )}
                  {place.sports === "배드민턴장" && (
                    <img alt="" src="/privateBadminton 2.png" />
                  )}
                  {place.sports === "테니스장" && (
                    <img alt="" src="/privateTennis 2.png" />
                  )}
                </SpotInfo>
                <AboutMySpot>
                  <div>- {place.spotKind}</div>
                  <div>{place.price}원</div>
                </AboutMySpot>
              </MyHostList> */}

              <ButWrap>
                <button
                  onClick={() => {
                    navigate(`/hostdetail/${place.placesId}`);
                  }}>
                  수정하기
                </button>
                <button onClick={() => deleteHostHandler(place.placesId)}>
                  삭제하기
                </button>
              </ButWrap>
            </MyMatch>
          );
        })}

        <Btn onClick={() => navigate(`/hosting`)}>내구장 등록하기</Btn>
        {/* </MyReserve> */}
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default HostList;
