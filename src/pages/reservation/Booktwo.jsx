import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Booktwo = () => {
  //   const [search, setSearch] = useState();
  //   const onChangeSearch = (e) => {
  //     e.preventDeafualt();
  //     setSearch(e.target.value);
  //   };
  const location = useLocation();
  //   const keyword = location.state;
  console.log(location);

  //   const onSearch = (e) => {
  //     e.preventDeafualt();
  //   };
  return (
    <>
      <Layout>
        <Header />
        <div>
          {/* <form onSubmit={(e) => onSearch(e)}>
            <input
              type="text"
              value={search}
              placeholder="구를 입력하세요 예) 마포구"
              onChange={onChangeSearch}
            />
            <button type="submit">스팟 찾기</button> */}
          {/* {keyword} 검색 결과 */}
          {/* </form> */}
        </div>
      </Layout>
    </>
  );
};

export default Booktwo;
