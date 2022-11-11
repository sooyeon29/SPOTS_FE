import { useState } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { PrivateApi } from '../../tools/instance';
import { useNavigate } from 'react-router-dom';

const Hosting = () => {
  const navigate = useNavigate();
  const [spot, setSpot] = useState({});

  const [checkedList, setCheckedList] = useState([]);
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((el) => el !== item));
    }
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

  const onRegisterHandler = (spot) => {
    const fullyAddress = fullAddress + spot.address;
    const data = { ...spot, comfort: checkedList, address: fullyAddress };
    // if (spot.address.trim() === '') {
    //   return alert('상세주소를 입력해주세요');
    // }
    // if (spot.price.trim() === '') {
    //   return alert('이용료를 입력해주세요');
    // }
    // if (spot.desc.trim() === '') {
    //   return alert('스팟을 소개해주세요');
    // }

    PrivateApi.registerSpot(data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert('스팟 등록이 완료되었습니다');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            <option>선택하세요</option>
            <option>FUTSAL</option>
            <option>TENNIS</option>
            <option>BADMINTON</option>
          </select>
        </div>
        <div>
          스팟 이름
          <input
            required
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
            <option>선택하세요</option>
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
                required
                type='text'
                placeholder='상세 주소를 입력해주세요'
                onChange={(e) => {
                  const { value } = e.target;
                  setSpot({
                    ...spot,
                    address: value,
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
            value='장비대여'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('장비대여') ? true : false}
          />
          장비대여
          <input
            type='checkbox'
            name='comforts'
            value='주차장'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('주차장') ? true : false}
          />
          주차장
          <input
            type='checkbox'
            name='comforts'
            value='샤워실'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('샤워실') ? true : false}
          />
          샤워실
          <input
            type='checkbox'
            name='comforts'
            value='탈의실'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('탈의실') ? true : false}
          />
          탈의실
          <input
            type='checkbox'
            name='comforts'
            value='개인락커'
            onChange={(e) => {
              onCheckedElement(e.target.checked, e.target.value);
            }}
            checked={checkedList.includes('개인락커') ? true : false}
          />
          개인락커
        </div>
        <div>
          1시간당
          <input
            required
            type='text'
            onChange={(e) => {
              const { value } = e.target;
              setSpot({
                ...spot,
                price: parseInt(value),
              });
            }}
          />
          원
        </div>
        <div>
          스팟 설명
          <br />
          <input
            required
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
