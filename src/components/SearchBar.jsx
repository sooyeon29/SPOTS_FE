import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

const Search = () => {
  // const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const onSearchHandler = async (e) => {
    e.preventDefault();
    window.location.href = "/book/" + keyword;
    // if (keyword.trim() === '') {
    //   return alert('검색어를 입력해주세요!');
    // }
    // navigate('/book', { state: [keyword] });
    // console.log({ state: [keyword] });
    // localStorage.setItem('savedKeyword', keyword);
  };

  return (
    <StSearch>
      <form onSubmit={onSearchHandler}>
        <SearchBar>
          <StInput
            type='text'
            value={keyword}
            placeholder='어떤 스팟을 찾으시나요?'
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <StBtn type="button">
            <BsSearch style={{ color: 'white', cursor: 'pointer' }} />
          </StBtn>
        </SearchBar>
      </form>
    </StSearch>
  );
};
export default Search;

const StInput = styled.input`
  background-color: transparent;
  border: none;
  display: flex;
  color: white;

  :focus {
    outline: none;
    color: white;

    ::placeholder {
      color: transparent;
      text-align: center;
    }
  }

  ::placeholder {
    color: white;
    text-align: center;
  }
`;

const StSearch = styled.div`
  /* width: 200px; */
  background: none;
  border: none;
  border-bottom: 2px solid white;
  display: flex;
  /* background-color: #f1f1f1; */
  justify-content: center;
`;

const StBtn = styled.button`
  border: none;
  background: none;
`;

const SearchBar = styled.div`
  display: flex;
`;
