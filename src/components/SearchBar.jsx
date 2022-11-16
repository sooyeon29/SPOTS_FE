import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const onSearchHandler = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (keyword.trim() === "") {
      return alert("검색어를 입력해주세요!");
    }
    navigate('/book', { state: [keyword] });
    localStorage.setItem("localKeyword", keyword);
=======
    navigate("/book", { state: [keyword] });
>>>>>>> 672fbf44ec04555342d67f5f865b60512406d678
    console.log({ state: [keyword] });
  };
  console.log(keyword);

  // if (localStorage.getItem('localKeyword') === null) {
  //   console.log('키워드 null');
  // }

  return (
    <StSearch>
      <form onSubmit={onSearchHandler}>
<<<<<<< HEAD
        <SearchBar>
          <StInput
            type='text'
            value={keyword}
            // defaultValue={
            //   localStorage.getItem('localKeyword') === null
            //     ? ''
            //     : localStorage.getItem('localKeyword')
            // }
            placeholder='어떤 스팟을 찾으시나요?'
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <StBtn>
            <BsSearch style={{ color: 'white', cursor: 'pointer' }} />
          </StBtn>
        </SearchBar>
=======
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
>>>>>>> 672fbf44ec04555342d67f5f865b60512406d678
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
