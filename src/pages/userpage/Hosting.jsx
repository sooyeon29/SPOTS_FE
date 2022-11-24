import { useState } from "react";
import Layout from "../../components/Layout";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PrivateApi } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import { HostCard, PageDesc, Image, ProfilePhotoInput } from "./Styles";
import FlexibleHeader from "../../components/FlexibleHeader";
import styled, { css } from "styled-components";
import TapBar from "../../components/TapBar";

const { kakao } = window;

const Hosting = () => {
  const title = "Host Page";
  const navigate = useNavigate();

  const [spot, setSpot] = useState({});
  const [checkedList, setCheckedList] = useState([]);
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);
  const [sports, setSports] = useState("");
  const [spotName, setSpotName] = useState("");
  const [spotKind, setSpotKind] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

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
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
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
    const fullyAddress = fullAddress + "\u00a0" + spot.address;
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
      console.log(x, y);

      const sendFD = new FormData();
      sendFD.append("image", img);
      sendFD.append("comforts", checkedList);
      sendFD.append("address", fullyAddress);
      sendFD.append("x", x);
      sendFD.append("y", y);
      sendFD.append("sports", sports);
      sendFD.append("spotName", spotName);
      sendFD.append("spotKind", spotKind);
      sendFD.append("price", price);
      sendFD.append("desc", desc);

      PrivateApi.registerSpot(sendFD)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("스팟 등록이 완료되었습니다");
            navigate("/hostlist");
          }
        })
        .catch((error) => {
          console.log(error);
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
            <label htmlFor="upload-input">
              <div>
                <p>+</p>
              </div>
            </label>
            <ProfilePhotoInput
              id="upload-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImagePreview(e);
              }}
              multiple="multiple"
            />
          </HostingPhotoUpload>
          <Image>
            <img
              key={1}
              src={preview}
              alt=""
              onerror="this.style.display='none';"
            />
          </Image>
        </ImageUpload>
        <HostCard enctype="multipart/form-data">
          <HostForm
            onSubmit={(e) => {
              e.preventDefault();
              onRegisterHandler(spot);
            }}
          >
            <InputLayout>
              <div> 스팟 종류</div>
              <SelectBox
                required
                onChange={(e) => {
                  setSports(e.target.value);
                }}
              >
                <option>선택하세요</option>
                <option>풋살장</option>
                <option>테니스장</option>
                <option>배드민턴장</option>
              </SelectBox>
            </InputLayout>
            <InputLayout>
              <div>스팟 이름</div>
              <InputText
                required
                type="text"
                onChange={(e) => {
                  setSpotName(e.target.value);
                }}
              />
            </InputLayout>
            <InputLayout>
              <div>장소</div>
              <SelectBox
                onChange={(e) => {
                  setSpotKind(e.target.value);
                }}
              >
                <option>선택하세요</option>
                <option>실내 스팟</option>
                <option>실외 스팟</option>
              </SelectBox>
            </InputLayout>
            <InputLayout>
              <div>
                <span>주소</span>
                <SearchBtn type="button" onClick={handleClick}>
                  주소 검색
                </SearchBtn>
              </div>
              <div>{fullAddress}</div>
            </InputLayout>
            <InputLayout>
              <div>상세주소</div>
              <InputText
                required
                type="text"
                placeholder="상세 주소를 입력해주세요"
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
              <div>1시간당</div>
              <InputText
                required
                type="text"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </InputLayout>

            <InputDesc>
              <p>스팟 설명</p>
              <div>
                <input
                  type="checkbox"
                  name="comforts"
                  value="장비대여"
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes("장비대여") ? true : false}
                />
                장비대여
                <input
                  type="checkbox"
                  name="comforts"
                  value="주차장"
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes("주차장") ? true : false}
                />
                주차장
                <input
                  type="checkbox"
                  name="comforts"
                  value="샤워실"
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes("샤워실") ? true : false}
                />
                샤워실
                <input
                  type="checkbox"
                  name="comforts"
                  value="탈의실"
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes("탈의실") ? true : false}
                />
                탈의실
                <input
                  type="checkbox"
                  name="comforts"
                  value="개인락커"
                  onChange={(e) => {
                    onCheckedElement(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes("개인락커") ? true : false}
                />
                개인락커
              </div>
              <textarea
                required
                style={{ height: "100px", width: "300px" }}
                type="text"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </InputDesc>
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
  div:first-child {
    display: flex;
    justify-content: center;
    width: 100px;
    height: 100px;
    background-color: #d9d9d9;
    border-radius: 10px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 38px;
    background: #1746c7;
    color: #ffffff;
    font-size: 24px;
  }
`;

const HostForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputLayout = styled.div`
  display: flex;
  width: 90%;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  text-align: center;

  div:first-child {
    width: 100px;
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
    padding: 8px 8px 8px 8px;
  }

  div:last-child {
    margin-left: 20px;
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
  margin-top: 50px;
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
  width: 150px;
`;

const SearchBtn = styled.button`
  border: none;
  background-color: #cecece;
  height: 28px;
  border-radius: 20px;
`;

// const Comports = styled.div`
//   width: 70%;
//   height: 100px;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
//   margin-bottom: 20px;

//   div {
//     width: 65px;
//     height: 28px;
//     border: none;
//     border-radius: 19px;
//     background-color: #d9d9d9;
//     color: #000000;
//     font-size: 13px;
//     text-align: center;
//     line-height: 28px;
//     margin-right: 10px;

//     ${({ onColor }) =>
//       onColor &&
//       css`
//         background-color: #1746c7;
//         color: #ffffff;
//       `};
//   }
// `;
