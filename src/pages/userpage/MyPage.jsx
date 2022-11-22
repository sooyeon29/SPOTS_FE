import React, { useEffect, useRef, useState } from "react";
import { StWrap, StTag } from "./Styles";
import useToggle from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/userSlice";
import { UserpageAPI } from "../../tools/instance";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  const { user } = useSelector((state) => state.user);
  // console.log(user.ID);

  const [isEdit, setIsEdit, clickEditMode] = useToggle();

  const nickRef = useRef();
  const phoneRef = useRef();

  const handleImagePreview = (file) => {
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
  };

  return (
    <Layout>
      <Header />
      <StWrap>
        <StTag>my</StTag>
        {!isEdit ? (
          <div>
            <img alt="기본프로필사진" src="/myprofile_icon.png" />
            <div>{user.nickname}</div>
            <div>{user.gender}</div>
            <div>핸드폰번호 : {user.phone}</div>
            <div>나의종목 : {user.sports}</div>
            <div>관심종목 : {user.favSports}</div>
            <div>point : {user.point}</div>
            <div>score : {user.score}</div>
            <button onClick={clickEditMode}>수정하기</button>
          </div>
        ) : (
          <div>
            <div>
              {preview.length > 0 ? (
                <img
                  key={1}
                  src={preview}
                  alt="미리보기"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : (
                <div>사진을 추가해 주세요!!!!</div>
              )}
              <input
                id="upload-input"
                type="file"
                onChange={(e) => {
                  handleImagePreview(e);
                }}
                accept="image/*"
              />
            </div>
            <p>
              nickname :
              <input type="text" defaultValue={user.nickname} ref={nickRef} />
              <button
                onClick={() => {
                  UserpageAPI.patchMyInfo({ nickname: nickRef.current.value })
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200) {
                        alert("수정이 완료되었습니다.");
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      if (err.response.status === 412) {
                        alert("중복된 닉네임입니다.");
                      }
                    });
                }}
              >
                중복확인
              </button>
            </p>
            <p>
              핸드폰번호 :
              <input type="text" defaultValue={user.phone} ref={phoneRef} />
              <button
                onClick={() => {
                  UserpageAPI.patchMyInfo({ phone: phoneRef.current.value })
                    .then((res) => {
                      console.log(res);
                      if (res.status === 200) {
                        alert("수정이 완료되었습니다.");
                        window.location.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      if (err.response.status === 412) {
                        alert("중복된 번호입니다.");
                      }
                    });
                }}
              >
                중복확인
              </button>
            </p>
            <button onClick={clickEditMode}>수정완료</button>
            <button
              onClick={() => {
                UserpageAPI.dropOutMe({ loginId: user.ID })
                  .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      window.confirm("탈퇴하시겠습니까?");
                      localStorage.clear();
                      navigate("/");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    if (err.status === 400) {
                    }
                  });
              }}
            >
              회원탈퇴
            </button>
          </div>
        )}
      </StWrap>
    </Layout>
  );
};

export default MyPage;
