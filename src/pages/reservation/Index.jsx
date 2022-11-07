import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Reservation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Header />
        <div>
          <form onSubmit={(e) => onSearch(e)}>
            <input
              type='text'
              value={search}
              placeholder='구를 입력하세요 예) 마포구'
              onChange={onChangeSearch}
            />
            <button type='submit'>스팟 찾기</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Reservation;
