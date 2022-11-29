import { useState } from 'react';
import Layout from '../../components/Layout';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { PrivateApi } from '../../tools/instance';
import { useNavigate } from 'react-router-dom';
import { HostCard, PageDesc, Image, ProfilePhotoInput } from './Styles';
import FlexibleHeader from '../../components/FlexibleHeader';
import styled, { css } from 'styled-components';
import TapBar from '../../components/TapBar';
import Swal from 'sweetalert2';

const { kakao } = window;

const Hosting = () => {
  const title = 'Host Page';
  const navigate = useNavigate();

  const [spot, setSpot] = useState({});
  const [checkedList, setCheckedList] = useState([]);
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);
  const [sports, setSports] = useState('');
  const [spotName, setSpotName] = useState('');
  const [spotKind, setSpotKind] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleImagePreview = (file) => {
    setImg(null);
    setPreview([]);
    console.log(file.target.files);
    // setImg(file.target.files);
    // file.target.files.length < 4
    //   ? setImg(file.target.files)
    //   : alert("사진은 최대 4개까지만 추가 가능합니다");

    //프리뷰 (핸들러를 통해 받은 이미지를 base64로 인코딩)
    // for (let i = 0; i < file.target.files.length; i++) {
    if (file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onloadend = () => {
        setImg(file.target.files[0]);

        //.onloadend : 읽기가 완료 되었을 때
        const base64 = reader.result;
        if (base64) {
          const previewSub = base64.toString();
          setPreview(previewSub);
        }
      };
    }
    // }
  };

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
    // console.log("도대체무슨데이터???", data);
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
    let x = null;
    let y = null;
    // 전체 주소 fullyAddress = 주소(daum post api) + 상세주소(input value값)
    const fullyAddress = fullAddress + '\u00a0' + spot.address;
    // geocoder = 주소를 좌표(x, y)로 변환시켜주는 메서드

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullyAddress, function (result, status) {
      let x = null;
      let y = null;
      // 주소가 정상적으로 좌표로 변환되면
      if (status === kakao.maps.services.Status.OK) {
        x = result[0].x;
        y = result[0].y;
      }
      // console.log(x, y);

      const sendFD = new FormData();
      sendFD.append('image', img);
      sendFD.append('comforts', checkedList);
      sendFD.append('address', fullyAddress);
      sendFD.append('x', x);
      sendFD.append('y', y);
      sendFD.append('sports', sports);
      sendFD.append('spotName', spotName);
      sendFD.append('spotKind', spotKind);
      sendFD.append('price', price);
      sendFD.append('desc', desc);

      PrivateApi.registerSpot(sendFD)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            Swal.fire({
              text: '스팟 등록이 완료되었습니다.',
              width: '300px',
              confirmButtonText: '확인',
              confirmButtonColor: '#40d295',
              showClass: { popup: 'animated fadeInDown faster' },
              hideClass: { popup: 'animated fadeOutUp faster' },
            });
            navigate('/hostlist');
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            text: '2MB 이하 용량의 이미지를 업로드해주세요',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        });
    });
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <PageDesc>나의 구장 등록</PageDesc>
        <ImageUpload>
          <HostingPhotoUpload>
            <label htmlFor='upload-input'>
              <div>
                {preview.length > 0 ? (
                  <span>
                    <img src='/cancel_icon.png' />
                  </span>
                ) : (
                  <span>
                    <img src='/plus_icon_blue.png' />
                  </span>
                )}
              </div>
            </label>
            <ProfilePhotoInput
              id='upload-input'
              type='file'
              accept='image/*'
              onChange={(e) => {
                handleImagePreview(e);
              }}
              multiple='multiple'
            />
          </HostingPhotoUpload>
          <HostPreview>
            {preview.length > 0 ? (
              <img
                key={1}
                src={preview}
                alt=''
                onerror="this.style.display='none';"
              />
            ) : (
              <Preview></Preview>
            )}
          </HostPreview>
        </ImageUpload>
        <HostCard enctype='multipart/form-data'>
          <HostForm
            onSubmit={(e) => {
              e.preventDefault();
              onRegisterHandler(spot);
            }}>
            <InputLayout>
              <div>이름</div>
              <InputText
                required
                type='text'
                onChange={(e) => {
                  setSpotName(e.target.value);
                }}
              />
            </InputLayout>
            <InputLayout>
              <div>종류</div>
              <SpotsLabel>
                <FootballInput
                  type='radio'
                  value='풋살장'
                  checked={sports === '풋살장'}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <FootballDiv></FootballDiv>
              </SpotsLabel>
              <SpotsLabel>
                <TennisInput
                  type='radio'
                  value='테니스장'
                  checked={sports === '테니스장'}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <TennisDiv></TennisDiv>
              </SpotsLabel>
              <SpotsLabel>
                <BadmintonInput
                  type='radio'
                  value='배드민턴장'
                  checked={sports === '배드민턴장'}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <BadmintonDiv></BadmintonDiv>
              </SpotsLabel>
            </InputLayout>
            <InputLayout>
              <div>장소</div>
              <KindLabel>
                <IndoorInput
                  type='radio'
                  value='실내'
                  checked={spotKind === '실내'}
                  onChange={(e) => {
                    setSpotKind(e.target.value);
                  }}
                />
                <IndoorDiv>실내</IndoorDiv>
              </KindLabel>
              <KindLabel>
                <OutdoorInput
                  type='radio'
                  value='실외'
                  checked={spotKind === '실외'}
                  onChange={(e) => {
                    setSpotKind(e.target.value);
                  }}
                />
                <OutdoorDiv>실외</OutdoorDiv>
              </KindLabel>
            </InputLayout>
            <InputLayout>
              <div>
                <span>주소</span>
                <SearchBtn type='button' onClick={handleClick}>
                  검색
                </SearchBtn>
              </div>
              {fullAddress}
            </InputLayout>
            <InputLayout>
              <div>상세주소</div>
              <InputText
                required
                type='text'
                onChange={(e) => {
                  const { value } = e.target;
                  setSpot({
                    ...spot,
                    address: value,
                  });
                }}
              />
            </InputLayout>

            <InputLayout>
              <div>시간당</div>
              <InputText
                required
                type='text'
                placeholder='시간당 가격을 입력해주세요'
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </InputLayout>

            <InputLayout>
              <div> 시설</div>
              {/* <p>스팟 설명</p> */}
              <div>
              <ComfortsWrap>
                <ComportsLabel>
                  <LentalInput
                    type='checkbox'
                    name='comforts'
                    value='장비대여'
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes('장비대여') ? true : false}
                  />
                  <LentalDiv>장비대여</LentalDiv>
                </ComportsLabel>
                <ComportsLabel>
                  <LockerInput
                    type='checkbox'
                    name='comforts'
                    value='개인락커'
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes('개인락커') ? true : false}
                  />
                  <LockerDiv>개인락커</LockerDiv>
                </ComportsLabel>
                </ComfortsWrap><ComfortsWrap>
                <ComportsLabel>
                  <ParkingInput
                    type='checkbox'
                    name='comforts'
                    value='주차장'
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes('주차장') ? true : false}
                  />
                  <ParkingDiv>주차장</ParkingDiv>
                </ComportsLabel>
                <ComportsLabel>
                  <ShowerInput
                    type='checkbox'
                    name='comforts'
                    value='샤워실'
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes('샤워실') ? true : false}
                  />

                  <ShowerDiv>샤워실</ShowerDiv>
                </ComportsLabel>
                <ComportsLabel>
                  <DressInput
                    type='checkbox'
                    name='comforts'
                    value='탈의실'
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={checkedList.includes('탈의실') ? true : false}
                  />
                  <DressDiv>탈의실</DressDiv>
                </ComportsLabel>
              </ComfortsWrap>
              </div>
            </InputLayout>
            <TextArea 
              required
              style={{ height: '100px', width: '240px' }}
              type='text'
              placeholder='설명을 입력해주세요'
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <SaveBtn>등록하기</SaveBtn>
          </HostForm>
        </HostCard>
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default Hosting;

const StWrap = styled.div`
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
`;

const HostingPhotoUpload = styled.div`
  img {
    width: 20px;
    position: absolute;
  }
`;

const HostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLayout = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  /* text-align: center; */

  div:first-child {
    width: 60px;
    text-align: center;
    /* border-right: 1px solid #cecece; */
    color: #545454;
    /* padding: 8px 8px 8px 8px; */
    margin-right: 30px;
  }
`;

const InputDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #545454;
    font-size: 14px;
    font-weight: 600;
  }

  div {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

const SaveBtn = styled.button`
  width: 90%;
  height: 52px;
  background-color: #1746c7;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 47px;
  line-height: 52px;
  text-align: center;
  border: none;
  margin-top: 30px;
`;

const InputText = styled.input`
  display: flex;
  border: none;
  width: 150px;
  :focus {
    outline: none;
  }
`;

const SelectBox = styled.select`
  border: none;
  /* width: 150px; */
`;

const SearchBtn = styled.button`
  border: none;
  /* background-color: #cecece; */
  height: 25px;
  width: 40px;
  border-radius: 5px;
`;

const Preview = styled.div`
  div:first-child {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;
    border-radius: 10px;
  }
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  border-radius: 10px;
`;

const HostPreview = styled.div`
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const SpotsLabel = styled.label`
  margin-right: 5px;
`;

export const FootballInput = styled.input`
  display: none;
`;
export const TennisInput = styled.input`
  display: none;
`;
export const BadmintonInput = styled.input`
  display: none;
`;

export const FootballDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/mypage/football_gray.png');
  background-size: 60px;

  ${FootballInput}:checked + && {
    background-image: url('/mypage/football_blue.png');
    background-size: 60px;
  }

  img {
    width: 60px;
    height: 60px;
  }
`;

export const TennisDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/mypage/tennis_gray.png');
  background-size: 60px;

  ${TennisInput}:checked + && {
    background-image: url('/mypage/tennis_blue.png');
    background-size: 60px;
  }
`;

export const BadmintonDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/mypage/badminton_gray.png');
  background-size: 60px;

  ${BadmintonInput}:checked + && {
    background-image: url('/mypage/badminton_blue.png');
    background-size: 60px;
  }
`;

export const KindLabel = styled.label``;

export const OutdoorInput = styled.input`
  display: none;
`;

export const IndoorInput = styled.input`
  display: none;
`;

export const IndoorDiv = styled.div`
  width: 95px;
  height: 25px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  ${IndoorInput}:checked + && {
    background-color: #1746c7;
    color: #fff;
  }
`;

export const OutdoorDiv = styled.div`
  width: 95px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 12px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  ${OutdoorInput}:checked + && {
    background-color: #1746c7;
    color: #fff;
  }
`;

export const ComfortsWrap = styled.div`
  display: flex;
  width: 180px;
  margin-bottom: 5px;

`;

export const ComportsLabel = styled.label`
margin-right: 5px;
`;

export const LentalInput = styled.input`
  display: none;
`;
export const LockerInput = styled.input`
  display: none;
`;
export const ParkingInput = styled.input`
  display: none;
`;
export const ShowerInput = styled.input`
  display: none;
`;
export const DressInput = styled.input`
  display: none;
`;

export const LentalDiv = styled.div`
  background-color: #d9d9d9;
  width: 60px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;
  color: #000;

  ${LentalInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    /* height: 25px; */
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const LockerDiv = styled.div`
  background-color: #d9d9d9;
  width: 60px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;
  color: #000;

  ${LockerInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    /* height: 25px; */
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const ParkingDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${ParkingInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    /* height: 25px; */
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const ShowerDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${ShowerInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    /* height: 25px; */
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const DressDiv = styled.div`
  background-color: #d9d9d9;
  width: 50px;
  /* height: 25px; */
  display: flex;
  justify-content: center;
  border-radius: 10px;
  padding: 3px;

  ${DressInput}:checked + && {
    background-color: #1746c7;
    width: 60px;
    /* height: 25px; */
    display: flex;
    justify-content: center;
    border-radius: 10px;
    padding: 3px;
    color: #fff;
  }
`;

export const TextArea = styled.textarea`
  margin-top: 20px;
   resize: none;
   padding: 10px;

  :focus {
    outline: none;
  }
`