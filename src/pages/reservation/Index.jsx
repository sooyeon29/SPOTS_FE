import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import { __getPrivateSpot } from "../../redux/modules/privateSlice";
import SpotsDetail from "../spotsDetail/index";

const Reservation = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPrivateSpot());
  }, []);

  const onChangeSearch = (e) => {
    e.preventDeafualt();
    setSearch(e.target.value);
  };
  const location = useLocation();
  const keyword = location.state;
  // console.log(keyword[0]);

  const onSearch = (e) => {
    e.preventDeafualt();
  };

  return (
    <>
      <Layout>
        <Header />

        <div>
          <form onSubmit={(e) => onSearch(e)}>
            <input
              type="text"
              // value={keyword[0]}
              placeholder="구를 입력하세요 예) 마포구"
              onChange={onChangeSearch}
            />
            <button type="submit">스팟 찾기</button>
            <div>
              {/* {keyword[1]}  */}
              검색 결과
            </div>
          </form>
        </div>
        <div>
          <button onClick={() => navigate(`/spotsdetail`)}>
            전체 시설 조회를 get
          </button>
          <button>전체 시설 조회를 get</button>
          <button>전체 시설 조회를 get</button>
        </div>
      </Layout>
    </>
  );
};

export default Reservation;
