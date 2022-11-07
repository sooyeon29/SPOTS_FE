import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Maps from "./Maps";
import { SearchBox, SpotsBtns } from "./Styles";

const Main = () => {
  const searchHandler = (e) => {
    e.preventDefalt();
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
          <select>
            <option>ALL</option>
            <option>FUTSAL⚽</option>
            <option>TENNIS🥎</option>
            <option>BADMINTON🏸</option>
          </select>
          <input type="text" required onChange={(e) => e.target.value} />
          <button>검색</button>
        </SearchBox>
      </Layout>
    </>
  );
};

export default Main;
