import { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PrivateApi } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HostCard,
  Photo,
  Preview,
  StWrap,
  Upload,
  UploadInput,
} from "./Styles";
import FlexibleHeader from "../../components/FlexibleHeader";

const { kakao } = window;

const Hosting = () => {
  const title = "Host Page";
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const fullyAddress = fullAddress + ("\u00a0") + spot.address;
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
        <HostCard enctype="multipart/form-data">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onRegisterHandler(spot);
            }}
          >
            <button type="button" onClick={() => navigate(`/hostlist`)}>
              내 구장 목록 보기
            </button>
            <div>
              스팟 종류
              <select
                required
                onChange={(e) => {
                  setSports(e.target.value);
                }}
              >
                <option>선택하세요</option>
                <option>풋살장</option>
                <option>테니스장</option>
                <option>배드민턴장</option>
              </select>
            </div>
            <div>
              스팟 이름
              <input
                required
                type="text"
                onChange={(e) => {
                  setSpotName(e.target.value);
                }}
              />
            </div>
            <Photo>
              <Preview>
                {preview.length > 0 ? (
                  <img
                    key={1}
                    src={preview}
                    alt="미리보기"
                    style={{
                      width: `100%`,
                      height: `100%`,
                    }}
                  />
                ) : (
                  <div>사진을 추가해 주세요</div>
                )}
              </Preview>
              <Upload>
                <UploadInput
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImagePreview(e);
                  }}
                  multiple="multiple"
                ></UploadInput>
              </Upload>
            </Photo>

            <div>
              실내/외
              <select
                onChange={(e) => {
                  setSpotKind(e.target.value);
                }}
              >
                <option>선택하세요</option>
                <option>실내 스팟</option>
                <option>실외 스팟</option>
              </select>
            </div>
            <div>
              <span>주소</span>
              <button type="button" onClick={handleClick}>
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
                </div>
              </div>
            ) : null}
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
            <div>
              1시간당
              <input
                required
                type="text"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              원
            </div>
            <div>
              스팟 설명
              <br />
              <textarea
                required
                style={{ height: "100px", width: "300px" }}
                type="text"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <button>등록하기</button>
          </form>
        </HostCard>
      </StWrap>
    </Layout>
  );
};

export default Hosting;
