import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const SearchBar = () => {
  const [keywords, setKeywords] = useState("");

  const onSearchHandler = async (e) => {
    e.preventDefault();
    window.location.href = "/book/" + keywords;
  };

  return (
    <StSearch>
      <form onSubmit={onSearchHandler}>
        <StInput
          type="text"
          value={keywords}
          placeholder="어떤 스팟을 찾으시나요?"
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
        />
        <StBtn type="button">
          <BsSearch style={{ color: "white", cursor: "pointer" }} />
        </StBtn>
      </form>
    </StSearch>
  );
};
export default SearchBar;

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
  background-color: black;
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
