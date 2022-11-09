import { useState } from "react";
import DatePicker from "react-datepicker";
import PickDate from "../../tools/DatePicker";
import {
  BookingBut,
  BookMatch,
  Croll,
  DateBut,
  Team,
  Time,
  Title,
  Wrap,
  MainInfo,
} from "./Styles";

const SpotsDetail = () => {
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  return (
    <>
      <Wrap>
        <Title>스팟츠 테니스장</Title>
        <MainInfo>
          <Croll>
            <img alt="" src="logo512.png" />
            <div>
              정보
              <li>주소</li>
              <li>02-398-6640</li>
            </div>
          </Croll>
        </MainInfo>
        <DateBut>
          <button>모달으로 달력열림</button>
          <PickDate />
        </DateBut>

        <Time>10:00-11:00 | 11:00-12:00 | 12:00-13:00 |</Time>
        <BookMatch>
          <Team>팀1</Team>
          vs
          <Team>팀2</Team>
        </BookMatch>
        <BookingBut>예약하기</BookingBut>
      </Wrap>
      <DatePicker
        showTimeSelect
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeClassName={handleColor}
      />
    </>
  );
};

export default SpotsDetail;
