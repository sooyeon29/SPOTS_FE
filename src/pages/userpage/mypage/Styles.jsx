import styled from "styled-components";

export const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 100px;
`;

export const Btn = styled.button`
  width: 90%;
  height: 52px;
  background-color: #ff00b4;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border-radius: 47px;
  line-height: 52px;
  text-align: center;
  border: none;
  margin-top: 50px;
  cursor: pointer;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const InfoLayout = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  border-bottom: 1px solid #cecece;
  font-size: 14px;
  font-weight: 600;

  div:first-child {
    width: 100px;
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
  }

  div:last-child {
    margin-left: 20px;
  }
`;

export const SportsLayout = styled.div`
  padding: 10px;
  max-width: 420px;
  margin: auto;
  div:first-child {
    font-size: 14px;
    font-weight: 600;
  }

  img {
    width: 100px;
  }
`;

export const SportBlock = styled.div`
  display: flex;
  margin: auto;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const SportTitle = styled.div`
  margin-bottom: 10px;
`;

export const ModifyBtn = styled.button`
  background: #d9d9d9;
  border-radius: 10px;
  border: none;
  margin-left: 60px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
`;

export const NickName = styled.div`
  margin-left: 20px;
  display: flex;
`;

export const ProfilePhotoInput = styled.input`
  display: none;
`;

export const ModifyDiv = styled.div`
  margin: auto;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SaveImage = styled.button`
  background-color: #ff00b4;
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: none;
  margin: auto;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
`;

export const ModifyBlock = styled.div`
  display: flex;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid #cecece;

  div:first-child {
    margin-top: 5px;
    width: 70px;
    padding-right: 10px;
    text-align: center;
    border-right: 1px solid #cecece;
    color: #545454;
  }

  input {
    margin-left: 20px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 5px;
    width: 120px;
    margin-bottom: 5px;
    margin-right: 10px;
    :focus {
      outline: none;
    }
  }

  button {
    margin-top: 5px;
    border: none;
    background-color: #fff;
    color: black;
    font-weight: 600;
    width: 68px;
  }
`;

export const ProfilePhotoUpload = styled.div`
  div {
    background-color: #1746c7;
    border: none;
    font-size: 30px;
    font-weight: 700;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    position: fixed;
    top: 22%;
    left: 53%;
    color: #fff;
  }
`;

export const ModifyBtns = styled.div`
  display: flex;
  margin: auto;
  margin-top: 40px;

  button {
    background-color: #1746c7;
    width: 160px;
    height: 40px;
    border-radius: 20px;
    border: none;
    margin: auto;
    color: #fff;
    font-weight: 600;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const ImageUpload = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HostingPhotoUpload = styled.div`
  img {
    width: 20px;
    position: absolute;
  }
`;

export const HostPreview = styled.div`
  img {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    object-fit: cover;
  }
`;

export const Preview = styled.div`
  div:first-child {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;
    border-radius: 100px;
  }
  height: 100px;
  width: 100px;
  background-color: #d9d9d9;
  border-radius: 100px;
`;
