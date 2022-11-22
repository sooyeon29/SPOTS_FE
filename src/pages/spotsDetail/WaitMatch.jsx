import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { __getOkMatch } from "../../redux/modules/matchSlice";

const WaitMatch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle, clickedToggle] = useToggle();
  const placeList = useSelector((state) => state?.spots.privateSpot);
  const selectSpot = placeList?.filter((place) => {
    return place.placesId === parseInt(id);
  });
  console.log("이페이지의 구장정보:", selectSpot);

  const [startDate, setStartDate] = useState(null);
  const pickDateHandler = (date, name) => {
    setStartDate(date);
    const bookDate = date?.toLocaleDateString().substring(0, 12);

    dispatch(
      __getOkMatch({
        place: name,
        date: bookDate,
      })
    );
    setToggle(false);
  };

  return (
    <>
      <div>으악</div>
    </>
  );
};

export default WaitMatch;
