import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ReactDatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";

const PickDate = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    // const selectedDate = new Date(time);

    // return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <ReactDatePicker
      locale={ko}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      //   showTimeSelect
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy"
      isClearable
      placeholderText="날짜 및 시간 재선택"
    />
  );
};

export default PickDate;
