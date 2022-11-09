import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SpotsDetail from "../spotsDetail/Index";

const Reservation = () => {
  const [search, setSearch] = useState();
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
        <SpotsDetail />
      </Layout>
    </>
  );
};

export default Reservation;
