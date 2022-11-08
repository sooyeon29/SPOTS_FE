import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import Maps from "./Maps";
import { SearchBox, SpotsBtns } from "./Styles";

const Main = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [search, setSearch, searchInput] = useInput();
  // setSearch도 값이 가져와야지 search에 바뀌는 값이 들어가게됨
  // console.log(search.target.value);
  console.log(search);
  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/booktwo`, { state: [search.sports, search.states] });
    // dispatch(__getSearch(search));
  };

  return (
    <>
      <Layout>
        <Header />
        <img alt="" src="fortest.jpg" width={100} />
        <SpotsBtns>
          <button>FUTSAL⚽</button>
          <button>TENNIS🥎</button>
          <button>BADMINTON🏸</button>
        </SpotsBtns>
        <Maps />
        <SearchBox onSubmit={searchHandler}>
          <select
            required
            name="sports"
            value={search?.sports}
            onChange={searchInput}
          >
            <option>ALL</option>
            <option>FUTSAL⚽</option>
            <option>TENNIS🥎</option>
            <option>BADMINTON🏸</option>
          </select>
          <input
            type="text"
            required
            name="states"
            value={search?.states}
            onChange={searchInput}
          />

          <button>검색</button>
        </SearchBox>
      </Layout>
    </>
  );
};

export default Main;
