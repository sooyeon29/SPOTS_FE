import { useState } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Hosting = () => {
  const [sports, setSports] = useState('');
  const [spot, setSpot] = useState('');
  const [time, setTime] = useState('');

  const onSportsHandler = (e) => {
    setSports(e.target.value);
  };

  const onSpotHandler = (e) => {
    setSpot(e.target.value);
  };

  const onTimeHandler = (e) => {
    setTime(e.target.value);
  }
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
      <div>
        스포츠 종류
        <select onChange={onSportsHandler}>
          <option>FUTSAL⚽</option>
          <option>TENNIS🥎</option>
          <option>BADMINTON🏸</option>
        </select>
      </div>
      <div>
        스팟 이름
        <input type='text' />
      </div>
      <div>
        스팟 종류
        <select onChange={onSpotHandler}>
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
          <span>
            상세주소
            <span style={{ color: 'red' }}>*</span>
          </span>
          <div>
            <div>{fullAddress}</div>
            <input
              type='text'
              name='address'
              // {...register('address', { required: true })}
              placeholder='상세 주소를 입력해주세요'
              autoComplete='off'
            />
            {/* {errors.address && errors.address.type === 'required' && (
            <p>상세 주소를 입력해주세요</p>
          )} */}
          </div>
        </div>
      ) : null}
      <div>
        <input type='checkbox' name='comforts' value='stuff' />
        장비대여
        <input type='checkbox' name='comforts' value='park' />
        주차장
        <input type='checkbox' name='comforts' value='shower' />
        샤워실
        <input type='checkbox' name='comforts' value='bathroom' />
        화장실
        <input type='checkbox' name='comforts' value='dressing' />
        탈의실
        <input type='checkbox' name='comforts' value='locker' />
        개인사물함
      </div>
      <div>
        <select onChange={onTimeHandler}>
          <option>1시간</option>
          <option>2시간</option>
          <option>3시간</option>
        </select>당
        <input type='text' />원
      </div>
      <div>
        스팟 설명
        <br />
        <textarea />
      </div>
    </Layout>
  );
};

export default Hosting;
