import { useState } from "react";
import Layout from "../../../components/Layout";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { PrivateApi } from "../../../tools/instance";
import { useNavigate } from "react-router-dom";
import FlexibleHeader from "../../../components/FlexibleHeader";
import imageCompression from 'browser-image-compression';
import TapBar from "../../../components/TapBar";
import Swal from "sweetalert2";
import {
  StWrap,
  ImageUpload,
  HostingPhotoUpload,
  HostForm,
  InputLayout,
  SaveBtn,
  InputText,
  SearchBtn,
  Preview,
  HostPreview,
  SpotsLabel,
  FootballInput,
  TennisInput,
  BadmintonInput,
  FootballDiv,
  TennisDiv,
  BadmintonDiv,
  KindLabel,
  OutdoorInput,
  IndoorInput,
  IndoorDiv,
  OutdoorDiv,
  ComfortsWrap,
  ComfortsLabel,
  LentalInput,
  LockerInput,
  ParkingInput,
  ShowerInput,
  DressInput,
  LentalDiv,
  LockerDiv,
  ParkingDiv,
  ShowerDiv,
  DressDiv,
  TextArea,
  HostCard,
  ProfilePhotoInput,
} from "./Styles";
const { kakao } = window;

const Hosting = () => {
  const title = "스팟 등록";
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

  const handleImage = (file) => {
    setImg(null);
    setPreview([]);

    if (file.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onloadend = () => {
        setImg(file.target.files[0]);
        const base64 = reader.result;
        if (base64) {
          const previewSub = base64.toString();
          setPreview(previewSub);
        }
      };
    }

    const prevFile = file.target.files[0];
    console.log(prevFile);
    imageCompression(prevFile, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], prevFile.name, {
        type: prevFile.type,
      });
      setImg(newFile);
      console.log(newFile);
    });

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
    // e.preventDefault();
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

      if (!spotName || spotName.trim() === "") {
        Swal.fire({
          text: "이름을 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!spotName || spotName.trim() === "") {
        Swal.fire({
          text: "이름을 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (spotName.length > 30) {
        Swal.fire({
          text: "30자 이내의 이름을 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!spotKind) {
        Swal.fire({
          text: "실내/외를 선택해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!fullAddress) {
        Swal.fire({
          text: "주소를 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!spot.address) {
        Swal.fire({
          text: "상세주소를 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!price) {
        Swal.fire({
          text: "가격을 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      if (!desc) {
        Swal.fire({
          text: "설명을 입력해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
        return;
      }
      PrivateApi.registerSpot(sendFD)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            Swal.fire({
              text: "스팟 등록이 완료되었습니다.",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            navigate("/hostlist");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.code === -2) {
            Swal.fire({
              text: "사진을 등록해주세요",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
          }
        });
    });
  };

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        {/* <PageDesc>나의 구장 등록</PageDesc> */}
        <ImageUpload>
          <HostingPhotoUpload>
            <label htmlFor="upload-input">
              <div>
                {preview.length > 0 ? (
                  <span>
                    <img alt="cancel_icon" src="/cancel_icon.png" />
                  </span>
                ) : (
                  <span>
                    <img alt="plus_icon" src="/plus_icon_blue.png" />
                  </span>
                )}
              </div>
            </label>
            <ProfilePhotoInput
              id="upload-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImage(e);
              }}
              multiple="multiple"
            />
          </HostingPhotoUpload>
          <HostPreview>
            {preview.length > 0 ? (
              <img
                key={1}
                src={preview}
                alt=""
                onerror="this.style.display='none';"
              />
            ) : (
              <Preview></Preview>
            )}
          </HostPreview>
        </ImageUpload>
        <HostCard enctype="multipart/form-data">
          <HostForm
            onSubmit={(e) => {
              e.preventDefault();
              onRegisterHandler(spot);
            }}
          >
            <InputLayout>
              <div>이름</div>
              <InputText
                // required
                type="text"
                onChange={(e) => {
                  setSpotName(e.target.value);
                }}
              />
            </InputLayout>
            <InputLayout>
              <div>종류</div>
              <SpotsLabel>
                <FootballInput
                  type="radio"
                  value="풋살장"
                  checked={sports === "풋살장"}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <FootballDiv></FootballDiv>
              </SpotsLabel>
              <SpotsLabel>
                <TennisInput
                  type="radio"
                  value="테니스장"
                  checked={sports === "테니스장"}
                  onChange={(e) => {
                    setSports(e.target.value);
                  }}
                />
                <TennisDiv></TennisDiv>
              </SpotsLabel>
              <SpotsLabel>
                <BadmintonInput
                  type="radio"
                  value="배드민턴장"
                  checked={sports === "배드민턴장"}
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
                  type="radio"
                  value="실내"
                  checked={spotKind === "실내"}
                  onChange={(e) => {
                    setSpotKind(e.target.value);
                  }}
                />
                <IndoorDiv>실내</IndoorDiv>
              </KindLabel>
              <KindLabel>
                <OutdoorInput
                  type="radio"
                  value="실외"
                  checked={spotKind === "실외"}
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
                <SearchBtn type="button" onClick={handleClick}>
                  검색
                </SearchBtn>
              </div>
              {fullAddress}
            </InputLayout>
            <InputLayout>
              <div>상세주소</div>
              <InputText
                // required
                type="text"
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
                // required
                type="text"
                placeholder="시간당 가격을 입력해주세요"
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
                  <ComfortsLabel>
                    <LentalInput
                      type="checkbox"
                      name="comforts"
                      value="장비대여"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={checkedList.includes("장비대여") ? true : false}
                    />
                    <LentalDiv>장비대여</LentalDiv>
                  </ComfortsLabel>
                  <ComfortsLabel>
                    <LockerInput
                      type="checkbox"
                      name="comforts"
                      value="개인락커"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={checkedList.includes("개인락커") ? true : false}
                    />
                    <LockerDiv>개인락커</LockerDiv>
                  </ComfortsLabel>
                </ComfortsWrap>
                <ComfortsWrap>
                  <ComfortsLabel>
                    <ParkingInput
                      type="checkbox"
                      name="comforts"
                      value="주차장"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={checkedList.includes("주차장") ? true : false}
                    />
                    <ParkingDiv>주차장</ParkingDiv>
                  </ComfortsLabel>
                  <ComfortsLabel>
                    <ShowerInput
                      type="checkbox"
                      name="comforts"
                      value="샤워실"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={checkedList.includes("샤워실") ? true : false}
                    />

                    <ShowerDiv>샤워실</ShowerDiv>
                  </ComfortsLabel>
                  <ComfortsLabel>
                    <DressInput
                      type="checkbox"
                      name="comforts"
                      value="탈의실"
                      onChange={(e) => {
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={checkedList.includes("탈의실") ? true : false}
                    />
                    <DressDiv>탈의실</DressDiv>
                  </ComfortsLabel>
                </ComfortsWrap>
              </div>
            </InputLayout>
            <TextArea
              // required
              style={{ height: "100px", width: "240px" }}
              type="text"
              placeholder="설명을 입력해주세요"
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
