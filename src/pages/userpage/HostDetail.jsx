import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import {
  __editPrivateSpot,
  __getMyPrivateSpot,
} from "../../redux/modules/spotsSlice";
import { StTeam, StWrap } from "./Styles";

const HostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(__getMyPrivateSpot());
  }, [dispatch]);

  const placeList = useSelector((state) => state.spots.myPrivateSpot);
  console.log(placeList);
  const place = placeList?.filter((pla) => pla.placesId === parseInt(id));
  console.log(place);
  const [isEditMode, setIsEditMode, editHandler] = useToggle();
  const [newInput, setNewInput] = useState([]);
  console.log(newInput);
  const newNewHandler = (e) => {
    const { name, value } = e.target;
    setNewInput({ ...newInput, [name]: value });
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
  };

  return (
    <>
      <Layout>
        <Header />
        <StWrap>
          {place?.map((pla) => {
            return (
              <StTeam key={pla.placesId}>
                {!isEditMode && (
                  <>
                    <h5>{pla.spotName}</h5>
                    <img alt="" src={pla.image} width="300px" />
                    <p>{pla.address}</p>
                    <p>
                      {pla.sports} - {pla.spotKind}
                    </p>
                    <p>{pla.desc}</p>
                    <p>{pla.comforts}</p>
                    <p>{pla.price}</p>
                    <button onClick={editHandler}>수정하기</button>
                    <button onClick={() => navigate(`/hostlist`)}>
                      목록으로돌아가기
                    </button>
                  </>
                )}
                {isEditMode && (
                  <form onSubmit={editInfoHandler}>
                    <h5>
                      <input
                        type="text"
                        required
                        name="newTitle"
                        value={newInput.newTitle}
                        onChange={newNewHandler}
                      />
                    </h5>
                    <img alt="" src={pla.image} width="300px" />
                    <p>{pla.address}</p>
                    <p>
                      {pla.sports} - {pla.spotKind}
                    </p>
                    <p>
                      <textarea
                        type="text"
                        required
                        style={{ height: "80px", width: "300px" }}
                        name="newDesc"
                        value={newInput.newDesc}
                        onChange={newNewHandler}
                      />
                    </p>
                    <p>{pla.comforts}</p>
                    <p>
                      <input
                        type="text"
                        required
                        name="newPrice"
                        value={newInput.newPrice}
                        onChange={newNewHandler}
                      />
                    </p>
                    <button>수정저장</button>
                    <button onClick={editHandler}>수정취소</button>
                  </form>
                )}
              </StTeam>
            );
          })}
        </StWrap>
      </Layout>
    </>
  );
};

export default HostDetail;
