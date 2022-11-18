import { useNavigate } from 'react-router-dom';
import { Place, PrivateBlock, PublicBlock } from './Style';

const SpotList = ({ spotList }) => {
  const navigate = useNavigate();
  console.log('----검색결과(사설)----', spotList?.private);
  console.log('----검색결과(공공)----', spotList?.public);

  return (
    <>
      {spotList?.private.map((privSpot) => {
        return (
          <Place>
            <h3>{privSpot.spotName}</h3>
            <div>{privSpot.sports}</div>
            <div>{privSpot.spotKind.
            substring(0,2)
            }</div>
            <div>
              {privSpot.address
              .split(' ')[1]
              }</div>
            <div>{privSpot.comforts}</div>
            <div>{privSpot.price}원</div>
          </Place>
        );
      })}
      {spotList?.public.map((pubSpot) => {
        return (
          <Place>
            <h3>{pubSpot.placenm}</h3>
            <div>{pubSpot.svcstatnm}</div>
            <div>{pubSpot.minclassnm}</div>
            <div>{pubSpot.svcnm}</div>
            <div>{pubSpot.areanm}</div>
          </Place>
        );
      })}
    </>
  );
};

export default SpotList;
