import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import SpotList from './HostSpotList';
import { FaSearchLocation } from 'react-icons/fa'
import {
  StWrap,
  MapPlace,
  PlaceList,
  Index,
  SearchTerm,
  StSearch,
  SearchInput,
} from './Style';
import SpotsMap from '../reservation/SpotsMap';
import SearchBar from '../../components/SearchBar';
import {
  __getAllSpot,
  __getSearchedSpot,
} from '../../redux/modules/spotsSlice';
import TapBar from '../../components/TapBar';
import FlexibleHeader from '../../components/FlexibleHeader';

const Reservation = () => {
  const [keywords, setKeywords] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading, error, searchedSpot, allSpot } = useSelector(
    (state) => state?.spots
  );
  const title = '스팟 검색';
  // const searchTerm = params.keyword;
  // console.log("키워드", searchTerm);
  // console.log("파람", params);

  useEffect(() => {
    if (!params.keywords) {
      dispatch(__getAllSpot());
    } else {
      dispatch(__getSearchedSpot(params.keywords));
    }
  }, []);

  const onSearchHandler = async (e) => {
    e.preventDefault();
    window.location.href = "/book/" + keywords;
  }
  // console.log("---검색---", searchedSpot);
  // console.log("---전체---", allSpot);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Layout>
        <FlexibleHeader title={title} />
        <StWrap>
          <StSearch>
          <FaSearchLocation />
            <form onSubmit={onSearchHandler}>
              <SearchInput
                type='text'
                // value={keywords}
                defaultValue={keywords}
                placeholder='지역, 스팟 이름으로 찾기'
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
            </form>
          </StSearch>
          <SearchTerm>
            {/* {!params.keywords ? (
              null
            ) : (
              <>
                <h4>'{params.keywords}' 스팟 검색 결과</h4>
              </>
            )} */}
          </SearchTerm>
          <MapPlace>
            {!params.keywords ? (
              <>
                {/* {console.log("-----No Params-----", allSpot)} */}
                <SpotsMap spotMarkers={allSpot} />
              </>
            ) : (
              <>
                {/* {console.log("-----Yes Params-----", searchedSpot)} */}
                <SpotsMap spotMarkers={searchedSpot} />
              </>
            )}
          </MapPlace>
          <Index>
            <img alt='공공스팟' src='/public.png' />
            <div>공공스팟</div>
            <img alt='사설스팟' src='/private.png' />
            <div>사설스팟</div>
          </Index>
          <PlaceList>
            {!params.keywords ? (
              <>
                <SpotList spotList={allSpot} />
              </>
            ) : (
              <>
                <SpotList spotList={searchedSpot} />
              </>
            )}
          </PlaceList>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default Reservation;
