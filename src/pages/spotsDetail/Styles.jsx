import styled from "styled-components";
export const WrapAll = styled.div`
  margin: 71px auto;
`;

export const Sports = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  font-weight: 700;
  font-size: 16px;
`;
export const SpotPhoto = styled.div`
  width: 95%;
  max-width: 800px;
  padding: 0px;
  overflow: hidden;
  margin: auto;
  border-radius: 10px;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 10px;
    margin: auto;
  }
`;
export const PlaceInfo = styled.div`
  margin: auto;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 85%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  div {
    margin-top: 5px;
  }
`;
export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  li {
    margin-top: 10px;
    font-weight: bold;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    div {
      img {
        margin-right: 5px;
      }
    }
  }
  div:last-child {
    img {
      margin-right: 5px;
      width: 15px;
    }
    justify-content: flex-start;
  }
`;
export const Calen = styled.div`
  margin: 5px auto 0px auto;
  div {
    background-color: white;
    color: black;
    padding: 6px;
    border-radius: 10px;
    font-size: 17px;
    button {
      margin-top: 18px;
      cursor: pointer;
    }
  }
`;
export const SelectDone = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 85%;
  height: 40px;
  font-weight: bold;
  max-width: 800px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0px auto;
  color: white;
  background-color: #3747bf;
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
`;
export const SelectDone2 = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  width: 50%;
  height: 180px;
  font-weight: bold;
  max-width: 800px;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px 0px 5px;
  background-image: url("/matching/blue_myteam.png");
  background-size: cover;
  &:disabled {
    /* background-color: #f7f8f8; */
    background-image: url("/matching/white_myteam.png");
    background-size: cover;
  }
`;
export const SelectDone3 = styled(SelectDone2)`
  background-image: url("/matching/blue_withteam.png");
  &:disabled {
    background-image: url("/matching/white_withteam.png");
  }
`;
export const MatchOrNot = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;
export const ExitBut = styled.button`
  cursor: pointer;
  width: 10%;
`;
export const CalTime = styled.div`
  border: 1px solid #cecece;
  border-radius: 10px;
  width: 95%;
  max-width: 800px;
  padding: 10px 0px 0px 0px;
  margin: 10px auto;
  p {
    margin-left: 20px;
  }
  span {
    margin-left: 20px;
    font-weight: bold;
  }
  img {
    width: 15px;
  }
`;
export const Times = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  :first-child {
    flex-direction: row;
    font-weight: bold;
    margin: 3px 10px 10px 0px;

    img {
      margin-right: 10px;
    }
  }
  button {
    cursor: pointer;
    background: #ffffff;
    /* box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); */
    border: 1px solid #cecece;
    /* border-radius: 8px; */
    /* margin-bottom: 6px; */
    width: 100%;
    height: 44px;
    font-weight: 400;
    font-size: 15px;
    color: #000;
    &:hover {
      background: #d9d9d9;
      /* box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); */
    }
    &:disabled {
      background-color: #d9d9d9;
    }
  }
`;
export const SelectChoice = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

export const TeamSelect = styled.select`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 95%;
  height: 50px;
  max-width: 800px;
  padding: 10px 10px;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 7px auto;
  option {
    text-align: center;
    color: #000;
  }
`;

export const Counter = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
  margin: auto;
  font-size: 15px;
  font-weight: bold;
  div:last-child {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    button {
      border: none;
      width: 40px;
      height: 40px;
      font-size: 25px;
      background-color: transparent;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      color: #000;
    }
    div {
      width: 40px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #d9d9d9;
      font-size: 15px;
      font-weight: bold;
    }
    button:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    button:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

// export const FindMatch = styled.button`
//   background: #d9d9d9;
//   box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
//   border: #d9d9d9;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// export const MainInfo = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   width: 100%;
//   margin: 0px;
//   padding: 10px;
// `;

// export const Wrap = styled.div`
//   border: 1px solid black;
//   margin-top: 10px;
//   padding: 0px 20px 0px 0px;
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
// `;

// export const SpotInfo = styled.div`
//   width: 45%;
//   display: flex;
//   flex-direction: column;
//   justify-content: first baseline;
//   padding: 10px;
//   /* height: 400px; */
//   span {
//     font-size: 10px;
//     margin: 7px auto 7px 0px;
//   }
//   p {
//     font-size: 10px;
//     margin: 0px;
//   }
//   h5 {
//     margin: 7px auto 0px 3px;
//   }
// `;

// export const TimeDate = styled.div`
//   /* display: flex; */
//   width: 100%;
//   padding: 10px;
// `;
// export const SelectList = styled.div`
//   /* width: 55%; */
//   span {
//     font-size: 12px;
//     margin-left: 5px;
//     font-weight: bold;
//   }
// `;

export const SelectTeam = styled.div`
  flex-direction: column;
  width: 100%;
`;
export const BookMatch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 1px solid #cecece;
  :first-child {
    font-size: 16px;
    font-weight: bold;
    margin: 3px 10px 10px 0px;
    border: none;
    img {
      margin: 0px 10px;
    }
  }
`;
export const Time = styled.div`
  margin-top: 12px;
  margin: auto;
  font-size: 17px;
`;
export const Team = styled.button`
  /* background-color: ${(props) => props.color}; */
  background: #ffffff;
  /* box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); */
  border: 1px solid #000000;
  border-radius: 10px;
  margin: 10px 10px 10px 5px;
  width: 90px;
  height: 44px;
  font-weight: 400;
  font-size: 15px;
  color: #000;
  cursor: pointer;
  &:hover {
    background: #d9d9d9;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    /* color: #c4c4c4; */
    background-color: #d9d9d9;
    border: none;
  }
  &:focus {
    background-color: #1746c7;
    color: white;
  }
`;

// export const YourSelect = styled.div`
//   margin: auto;
//   padding: 30px;

//   div {
//     display: flex;
//   }
//   select {
//     margin: 10px;
//   }
//   input {
//     margin: 10px;
//   }
// `;
// export const ShowDateTime = styled.div`
//   width: 90%;
//   border: 1px solid black;
//   height: 150px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
// `;

// export const NoMatchBook = styled.button`
//   margin: 10px auto;
//   cursor: pointer;
// `;
// export const BookingBut = styled.button`
//   cursor: pointer;
// `;
export const Pick = styled.div`
  display: flex;
  height: 38px;
  justify-content: center;
  z-index: 1;
  width: 90%;
  background-color: #f8f9fd;
  border: 1px solid #f1f3f7;
  border-radius: 8px;
  margin: 10px auto 10px auto;
`;
export const One = styled.button`
  z-index: 2;
  width: 50%;
  height: 100%;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px #e9ebec;
  border-radius: 7px;
  border: 0px;
  color: #000;
  /* margin-right: 3%; */
  cursor: pointer;
  &:hover {
    background: #d9d9d9;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  }
`;
export const Two = styled.button`
  width: 50%;
  height: 100%;
  text-align: center;
  align-items: center;
  cursor: pointer;
  border: 0px;
`;
export const FinalBooking = styled.button`
  display: flex;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  /* z-index: 1; */
  /* color: white; */
  border: none;
  width: 95%;
  background-color: #cecece;
  /* border: 1px solid #f1f3f7; */
  border-radius: 10px;
  margin: 10px auto 20px auto;
  cursor: pointer;
`;
// export const MakeMatch = styled.div`
//   display: flex;
//   flex-direction: row;
// `;
// export const GoMatch = styled.div`
//   button {
//     height: 95%;
//     margin: 10px;
//   }
// `;
export const WaitList = styled.div`
  margin: 12px auto 5px auto;
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: #ff00b4;
  color: white;
  width: 40%;
  padding: 7px;
`;

export const MatchList = styled(BookMatch)`
  margin: 5px auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 95%;
  border: none;
  /* display: flex;
  flex-direction: column; */
`;
export const WaitingMatch = styled.div`
  font-size: 12px;
  /* color: white; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  /* height: 51px; */
  border-radius: 10px;
  margin: 10px 3px 0px 10px;
  /* background-image: url(/football.png); */
  background-color: #f5f5f5;
  /* background-size: cover; */
  padding: 2px;
  /* border-radius: 40px; */
  div {
    display: flex;
    flex-direction: column;
    font-size: 23px;
    padding: 3px;
    span {
      font-size: 12px;
      margin: 5px auto 3px auto;
    }
    span:last-child {
      font-size: 15px;
    }
    img {
      margin: 5px auto 5px auto;
      width: 60px;
    }
  }
`;
export const WaitingMatch2 = styled(WaitingMatch)`
  background-color: #1746c7;
  color: white;
`;

export const EmailInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 38px;
  padding-left: 15px;
  background-color: #f4f4f4;
  margin: 5px auto 10px auto;
  /* border-color: #f4f4f4; */
  border: none;
  border-radius: 8px;
  ::placeholder {
    color: #c2c2c2;
    font-size: 15px;
  }
`;
export const Email = styled.div`
  margin-left: 15px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  width: fit-content;
  border-radius: 10px;
  background-color: aliceblue;
`;
