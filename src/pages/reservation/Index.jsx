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
            <img src='/public.png' />
            <div>공공</div>
            <img src='/private.png' />
            <div>사설</div>
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
