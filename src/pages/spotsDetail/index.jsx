import {
  BookingBut,
  BookMatch,
  Croll,
  DateBut,
  Team,
  Time,
  Title,
  Wrap,
} from "./Styles";

const SpotsDetail = () => {
  return (
    <>
      <Wrap>
        <Title>스팟츠 테니스장</Title>
        <Croll>
          <img alt="" src="" />
          <div>
            크롤링된 정보
            <li>주소</li>
            <li>02-398-6640</li>
          </div>
        </Croll>
        <DateBut>
          <button>모달으로 달력열림</button>
        </DateBut>
        <Time>10:00-11:00 | 11:00-12:00 | 12:00-13:00 |</Time>
        <BookMatch>
          <Team>팀1</Team>
          vs
          <Team>팀2</Team>
        </BookMatch>
        <BookingBut>예약하기</BookingBut>
      </Wrap>
    </>
  );
};

export default SpotsDetail;
