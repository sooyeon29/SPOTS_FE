import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ReactDatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { setDate } from "../redux/modules/matchSlice";

const PickDate = () => {
  const dispacth = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  //   console.log(startDate);
  const pickDateHandler = (date) => {
    setStartDate(date);

    // 세션스토리지에 선택한 날짜를 저장하는 방식
    // const pickedDate = { date: startDate };
    // // console.log(pickedDate);
    // window.sessionStorage.setItem("date", JSON.stringify(pickedDate));

    // 리듀서에 선택한 날짜를 저장하는 방식
    dispacth(setDate(startDate));
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
