import PickDate from "../../tools/DatePicker";
import {
  BookingBut,
  BookMatch,
  Croll,
  Team,
  Title,
  Wrap,
  MainInfo,
} from "./Styles";

const SpotsDetail = () => {
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

        <PickDate />

        <BookMatch>
          <Team>팀1</Team>
          vs
          <Team>팀2</Team>
        </BookMatch>
        <BookingBut>예약하기</BookingBut>
      </Wrap>
      {/* <ReactDatePicker
        showTimeSelect
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeClassName={handleColor}
      /> */}
    </>
  );
};

export default SpotsDetail;
