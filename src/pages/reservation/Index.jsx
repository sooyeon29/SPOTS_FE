import { useState } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

const Reservation = () => {
  const [search, setSearch] = useState();
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  
  const onSearch = (e) => {
    e.preventDefault();
    
  }

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
