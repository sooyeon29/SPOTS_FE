import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const Reservation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Header />
        <div>hi</div>
        <button onClick={() => navigate(`/spotsdetail`)}>상세페이지로</button>
      </Layout>
    </>
  );
};

export default Reservation;
