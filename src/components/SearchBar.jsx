import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Search = () => {
  //const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

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
        <StInput
          type="text"
          value={keyword}
          placeholder="어떤 스팟을 찾으시나요?"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <StBtn>
          <BsSearch style={{ color: "white", cursor: "pointer" }} />
        </StBtn>
      </form>
    </StSearch>
  );
};
export default Search;

const StSearch = styled.div`
  width: 100%;
  margin-right: 20px;
  background: none;
  border: none;
  border-bottom: 2px solid white;
  display: flex;
  justify-content: space-between;
  padding: 0;
  form {
    display: flex;
    padding: 0;
  }
`;

const StInput = styled.input`
  width: 130px;
  background-color: transparent;
  border: none;
  display: flex;
  padding: 0;
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

const StBtn = styled.button`
  margin-left: 5px;
  border: none;
  background: none;
  cursor: pointer;
`;
