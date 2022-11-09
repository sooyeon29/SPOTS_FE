import { useState } from "react";
import ReactDatePicker from "react-datepicker";

const PickDate = () => {
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <ReactDatePicker
      showTimeSelect
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      timeClassName={handleColor}
    />
  );
};

export default PickDate;
