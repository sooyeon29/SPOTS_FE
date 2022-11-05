import styled from 'styled-components';

export const Red = styled.span`
  color: red;
`;

export const MySports = styled.div`
  background-color: aliceblue;
  width: 100px;
  height: 100px;

  input {
    display: none;

    :checked {
        border: 2px solid purple;
    }
  }

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    border: 2px solid black;
    box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.1);
    transition: all 200ms ease-in-out;
  }
`;

/* 
    ::before{
        content: "✓";
        position: absolute;
        width: 18px;
        height: 18px;
        left: 8px;
        top: 8px;
        background-color: blue;
        color: #fff;
        text-align: center;
        line-height: 18px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 50%;
        opacity: 0%;
        transform: scale(0.5);
        transition: all 200ms ease-in-out; */

export const Icon = styled.div`
  margin-top: 10px;
  font-size: 30px;
  color: #555;
  transition: all 200ms ease-in-out;
`;

export const Title = styled.div`
  font-size: 20px;
  color: #555;
  padding: 5px 0px;
  transition: all 200ms ease-in-out;
`;
