import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ReactDatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";

const PickDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  //   console.log(startDate);
  const pickDateHandler = (date) => {
    setStartDate(date);
    const pickedDate = { date: startDate };
    // console.log(pickedDate);
    window.sessionStorage.setItem("date", JSON.stringify(pickedDate));
  };

  return (
    <ReactDatePicker
      locale={ko}
      selected={startDate}
      onChange={(date) => pickDateHandler(date)}
      // setStartDate(date)}
      //   withPortal
      isClearable
      //   portalId="root-portal"
      dateFormat="MM월 dd일 EE요일"
    />
  );
};

export default PickDate;
