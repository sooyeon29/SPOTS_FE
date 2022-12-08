import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import FlexibleHeader from "../../components/FlexibleHeader";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import {
  __deletePrivateSpot,
  __editPrivateSpot,
  __getMyPrivateSpot,
} from "../../redux/modules/spotsSlice";

const HostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const title = "나의 스팟";

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, [dispatch]);

  const placeList = useSelector((state) => state.spots.myPrivateSpot);
  const place = placeList?.filter((pla) => pla.placesId === parseInt(id));
  const [isEditMode, setIsEditMode, editHandler] = useToggle();
  const [newInput, setNewInput] = useState([]);

  const newNewHandler = (e) => {
    const { name, value } = e.target;
    setNewInput({ ...newInput, [name]: value });
  };

  const deleteHostHandler = (id) => {
    Swal.fire({
      text: "삭제하시겠습니까?",
      width: "350px",
      showCancelButton: true,
      confirmButtonColor: "#40d295",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      showClass: { popup: "animated fadeInDown faster" },
      hideClass: { popup: "animated fadeOutUp faster" },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(__deletePrivateSpot(id));
        navigate("/hostlist");
      }
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();
    dispatch(
      __editPrivateSpot({
        placesId: id,
        spotName: newInput.newTitle,
        desc: newInput.newDesc,
        price: newInput.newPrice,
      })
    );
    setIsEditMode(false);
    setNewInput([]);
  };

  return (
    <>
      <Layout>
        <FlexibleHeader title={title} />
        <SpotsWrap>
          {place?.map((pla) => {
            return (
              <StTeam key={pla.placesId}>
                {!isEditMode && (
                  <>
                    <SpotImg alt="" src={pla.image} />
                    <SpotsLayout>
                      <div>이름</div>
                      <div>{pla.spotName}</div>
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>종류</div>
                      <SpotIcon>
                        {pla.sports === "테니스장" ? (
                          <img
                            alt="tennis_blue"
                            src="/mypage/tennis_blue.png"
                          />
                        ) : null}
                        {pla.sports === "배드민턴장" ? (
                          <img
                            alt="badminton_blue"
                            src="/mypage/badminton_blue.png"
                          />
                        ) : null}
                        {pla.sports === "풋살장" ? (
                          <img
                            alt="football_blue"
                            src="/mypage/football_blue.png"
                          />
                        ) : null}
                      </SpotIcon>
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>장소</div>
                      <div>
                        {pla.spotKind === "실외 스팟" ? (
                          <SpotKind>실외</SpotKind>
                        ) : (
                          <SpotKind>실내</SpotKind>
                        )}
                      </div>
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>주소</div>
                      <div style={{ width: "250px" }}>{pla.address}</div>
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>시간당</div>
                      <div>
                        {Number(pla.price).toLocaleString("ko-KR")}포인트
                      </div>
                    </SpotsLayout>
                    <ComfortsLayout>
                      <p>시설</p>
                      <div>
                        {pla.comforts.includes("주차장") ? (
                          <SpotsComforts>주차장</SpotsComforts>
                        ) : null}
                        {pla.comforts.includes("장비대여") ? (
                          <SpotsComforts>장비대여</SpotsComforts>
                        ) : null}
                        {pla.comforts.includes("탈의실") ? (
                          <SpotsComforts>탈의실</SpotsComforts>
                        ) : null}
                        {/* </ComfortsWrap><ComfortsWrap> */}
                        {pla.comforts.includes("샤워실") ? (
                          <SpotsComforts>샤워실</SpotsComforts>
                        ) : null}
                        {pla.comforts.includes("개인락커") ? (
                          <SpotsComforts>개인락커</SpotsComforts>
                        ) : null}
                      </div>
                      {/* </ComfortsWrap> */}
                    </ComfortsLayout>
                    <SpotsLayout>
                      <div>설명</div>
                      <div>{pla.desc}</div>
                    </SpotsLayout>
                    <SpotsBtns>
                      <button onClick={editHandler}>수정하기</button>
                      <button onClick={() => deleteHostHandler(pla.placesId)}>
                        삭제하기
                      </button>
                    </SpotsBtns>
                  </>
                )}
                {isEditMode && (
                  <form onSubmit={editInfoHandler}>
                    <SpotImg alt="" src={pla.image} width="300px" />
                    <SpotsLayout>
                      <div>이름</div>
                      <input
                        type="text"
                        required
                        name="newTitle"
                        defaultValue={pla.spotName}
                        value={newInput.newTitle}
                        onChange={newNewHandler}
                      />
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>시간당</div>
                      <input
                        type="text"
                        required
                        name="newPrice"
                        defaultValue={pla.price}
                        value={newInput.newPrice}
                        onChange={newNewHandler}
                      />
                      포인트
                    </SpotsLayout>
                    <SpotsLayout>
                      <div>설명</div>
                      <textarea
                        style={{
                          width: "220px",
                          height: "50px",
                          resize: "none",
                        }}
                        type="text"
                        required
                        name="newDesc"
                        defaultValue={pla.desc}
                        value={newInput.newDesc}
                        onChange={newNewHandler}
                      />
                    </SpotsLayout>
                    <SpotsBtns>
                      <button onClick={editInfoHandler}>수정하기</button>
                      <button onClick={editHandler}>돌아가기</button>
                    </SpotsBtns>
                  </form>
                )}
              </StTeam>
            );
          })}
        </SpotsWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default HostDetail;

const SpotsWrap = styled.div`
  width: 330px;
  margin: auto;
  margin-top: 70px;
`;

const SpotImg = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const SpotIcon = styled.div`
  img {
    width: 40px;
  }
`;

const SpotsLayout = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div:first-child {
    width: 40px;
    text-align: center;
    color: #545454;
    margin-right: 30px;
  }

  input {
    border-radius: 5px;
    height: 20px;
    border: 1px solid gray;
    margin-right: 5px;
  }

  textarea {
    border-radius: 10px;
    padding: 5px;
  }
`;

const SpotKind = styled.span`
  background-color: #1746c7;
  color: #fff;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
`;

const SpotsComforts = styled.span`
  background-color: #1746c7;
  color: #fff;
  padding: 3px 5px 3px 5px;
  border-radius: 10px;
  margin-right: 5px;
  word-break: keep-all;
`;

const SpotsBtns = styled.div`
  display: flex;

  button {
    display: flex;
    width: 45%;
    height: 40px;
    border: none;
    background-color: #1746c7;
    border-radius: 20px;
    color: #fff;
    margin: auto;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 70px;
    font-size: 16px;
    font-weight: 700;
  }
`;

const ComfortsLayout = styled.div`
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;

  div {
    width: 230px;
  }

  p:first-child {
    margin-left: 12px;
    width: 40px;
    text-align: center;
    color: #545454;
    margin-right: 30px;
  }
`;

const StTeam = styled.div`
  width: 100%;
  margin: auto;
`;
