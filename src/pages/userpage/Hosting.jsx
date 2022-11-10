import { useState } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Hosting = () => {

  const [spot, setSpot] = useState({
    spotName: '',
    price: '',
    desc: '',
    address: '',
  });

  const [checkedList, setCheckedList] = useState([]);
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
  };

  const onRegisterHandler = (e) => {
    // console.log("체크리스트:", checkedList, "스팟:", spot)
    setSpot({...spot, comfort: checkedList})
    console.log(spot)
  };

  const open = useDaumPostcodePopup();
  const [fullAddress, setFullAddress] = useState();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setFullAddress(fullAddress);
  };

  // 주소검색 onClickHandler
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Layout>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegisterHandler(spot);
        }}>
        <div>
          스포츠 종류
          <select
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                sports: value,
              });
            }}>
            <option>FUTSAL⚽</option>
            <option>TENNIS🥎</option>
            <option>BADMINTON🏸</option>
          </select>
        </div>
        <div>
          스팟 이름
          <input
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                spotName: value,
              });
            }}
          />
        </div>
        <div>
          스팟 종류
          <select
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                spotKind: value,
              });
            }}>
            <option>실내 스팟</option>
            <option>실외 스팟</option>
          </select>
        </div>

        <div>
          <span>주소</span>
          <button type='button' onClick={handleClick}>
            주소 검색
          </button>
        </div>
        {fullAddress ? (
          <div>
            <span>상세주소</span>
            <div>
              <div>{fullAddress}</div>
              <input
                type='text'
                placeholder='상세 주소를 입력해주세요'
                onChange={(e) => {
                  const { value } = e.target;
                  setSpot({
                    ...spot,
                    address: { fullAddress } + value,
                  });
                }}
              />
            </div>
          </div>
        ) : null}
        <div>
          <input
            type='checkbox'
            name='comforts'
            value='stuff'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('stuff') ? true : false}
          />
          장비대여
          <input
            type='checkbox'
            name='comforts'
            value='park'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('park') ? true : false}
          />
          주차장
          <input
            type='checkbox'
            name='comforts'
            value='shower'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('shower') ? true : false}
          />
          샤워실
          <input
            type='checkbox'
            name='comforts'
            value='dress'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('dress') ? true : false}
          />
          탈의실
          <input
            type='checkbox'
            name='comforts'
            value='locker'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('locker') ? true : false}
          />
          개인사물함
        </div>
        <div>
          1시간당
          <input
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                price: value,
              });
            }}
          />
          원
        </div>
        <div>
          스팟 설명
          <br />
          <input
            style={{ height: '200px', width: '400px' }}
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                desc: value,
              });
            }}
          />
        </div>
        <button>등록하기</button>
      </form>
    </Layout>
  );
};

export default Hosting;
