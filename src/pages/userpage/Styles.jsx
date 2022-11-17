import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StWrap = styled.div`
  width: 90%;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 15px;
  margin-top: 50px;
  align-items: center;
`;

export const StTag = styled.button`
  width: 20%;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 15px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;

export const StTeam = styled.div`
  width: 90%;

  border: 1px solid lightgray;
  border-radius: 15px;
  margin: auto;
`;

export const StTeamForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
export const MyMatch = styled.div`
  border: 1px solid black;
`;
export const HostCard = styled.div``;
export const Preview = styled.div``;
export const Photo = styled.div`
  ${Preview} {
    border: 1px solid black;
    height: 200px;
    width: 80%;
    /* margin-bottom: 20px; */
    line-height: 300px; //글자를 vertical로 중앙 정렬시 line-height 주고 vertical-align 주기
    vertical-align: middle;
    display: flex;
    flex-wrap: wrap;
    img {
      //스타일드 컴포넌트내에 있는 태그
      object-fit: cover;
      background-color: beige;
      /* border: 1px solid black; */
    }
    div {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
export const UploadInput = styled.input``;
export const UploadInputDesign = styled.label``;

export const Upload = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  ${UploadInput} {
    /* display: none; */
  }

  ${UploadInputDesign} {
    display: inline-block;
    width: 130px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    background-color: lightgray;
    border-radius: 10px;
    margin-right: 10px;
    :hover {
      background: gray;
    }
  }
`;
export const MyHostList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const WordInfo = styled.div`
  margin-left: 50px;
`;
export const ImageInfo = styled.div`
  img {
    width: 120px;
    margin: 20px 50px 10px auto;
  }
`;
export const ButWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0px 40px 20px auto;
`;
