import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

const Search = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sports, setSports] = useState('');

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/book', { state: [keyword] });
    console.log({ state: [keyword] });
  };
  console.log(keyword);

  return (
    <StSearch>
      <form onSubmit={onSearchHandler}>
        <StInput
          type='text'
          value={keyword}
          placeholder='어떤 스팟을 찾으시나요?'
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <StBtn>
          <BsSearch style={{ color: 'white', cursor: 'pointer' }} />
        </StBtn>
      </form>
    </StSearch>
  );
};
export default Search;

const StInput = styled.input`
  background-color: transparent;
  border: none;
  margin-right: 2px;

  :focus {
    outline: none;
    color: white;

    ::placeholder {
      color: transparent;
    }
  }

  ::placeholder {
    color: white;
  }
`;

const StSearch = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid white;
`;

const StBtn = styled.button`
  border: none;
  background: none;
`;
