// import { ko } from "date-fns/esm/locale";
// import { useEffect, useState } from "react";
// import ReactDatePicker from "react-datepicker";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import FlexibleHeader from "../../components/FlexibleHeader";
// import Layout from "../../components/Layout";
// import TapBar from "../../components/TapBar";
// import useInput from "../../hooks/useInput";
// import useToggle from "../../hooks/useToggle";
// import { __getOkMatch, __postSpotsMatch } from "../../redux/modules/matchSlice";
// import { __getPrivateSpot } from "../../redux/modules/spotsSlice";
// import { __getMyInfo, __getMyteamList } from "../../redux/modules/userSlice";
// import {
//   Calen,
//   CalTime,
//   Counter,
//   FinalBooking,
//   GoMatch,
//   MakeMatch,
//   MoreInfo,
//   One,
//   Pick,
//   PlaceInfo,
//   SelectChoice,
//   SelectDone,
//   SelectDone2,
//   Sports,
//   SpotPhoto,
//   TeamSelect,
//   Times,
//   Title,
//   Two,
//   WrapAll,
// } from "./Styles";

// const Matching = () => {
//   const title = "예약";
//   const [toggle, setToggle, clickedToggle] = useToggle();
//   const [toggleTwo, setToggleTwo, clickedToggleTwo] = useToggle();
//   const myTime = [
//     "06:00 - 08:00",
//     "08:00 - 10:00",
//     "10:00 - 12:00",
//     "12:00 - 14:00",
//     "14:00 - 16:00",
//     "16:00 - 18:00",
//     "18:00 - 20:00",
//     "20:00 - 22:00",
//   ];

//   // 리스트 중에서 선택한 place를 가져온다 파람값으로 비교해 필터해준다
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const placeList = useSelector((state) => state?.spots.privateSpot);
//   const selectSpot = placeList?.filter((place) => {
//     return place.placesId === parseInt(id);
//   });
//   console.log("이페이지의 구장정보:", selectSpot);

//   // 1. 예약을 원하는 날짜를 선택한다
//   // --> 달력에 선택하는 날짜가 선택됨
//   const [startDate, setStartDate] = useState(null);
//   const pickDateHandler = (date, name) => {
//     setStartDate(date);
//     // const bookDate = JSON.stringify(date).substring(1, 11);
//     const bookDate = date?.toLocaleDateString().substring(0, 12);

//     // dispatch(
//     //   __getAllMatch({
//     //     place: name,
//     //     date: bookDate,
//     //   })
//     // );
//     dispatch(
//       __getOkMatch({
//         place: name,
//         date: bookDate,
//       })
//     );
//     setToggle(false);
//   };
//   const exitMatchDate = () => {
//     setStartDate(null);
//     setToggle(false);
//   };
//   // 2. 예약을 원하는 시간을 선택한다
//   const [pickedTime, setPickedTime] = useState("");
//   // 시간선택하면 포인트가 선택됨
//   const [payPrice, setPayPrice] = useState(0);

//   const teamPick = (time, price) => {
//     setPickedTime(myTime[time]);
//     setPayPrice(price);
//     setToggleTwo(false);
//   };
//   const exitMatchTime = () => {
//     setPickedTime("");
//     setToggleTwo(false);
//   };

//   // 3.단식경기를할지 복식경기를 할지 선택하기
//   const [isTwo, setIsTwo, pickTwoHandler] = useToggle();

//   // 4. 나의 팀중에서 하나를 선택한다 ( 나의 정보에서 가져온다)
//   // 내 포인트도 가져와주었다(결제를 위해 밑에서 사용할예정이다 -> patch이용할것)
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(__getMyteamList());
//     dispatch(__getMyInfo());
//     dispatch(__getPrivateSpot());
//   }, []);
//   const [myTeam, setMyTeam, pickMyTeam] = useInput();
//   // 팀이 없더라도 오류가 나지 않도록 옵셔널 체이닝을 사용한다. 세션스토리지에 저장해준다
//   const myTeams = useSelector((state) => state.user.team);
//   console.log("내팀리스트:", myTeams);

//   // 5. 경기에 참가할 인원수를 작성해준다.
//   const [count, setCount] = useState(0);

//   // @@++나의 포인트를 가져와 주었다 이것으로 계산할꺼다 ++@@
//   const { user } = useSelector((state) => state.user);
//   const myPoint = user.point;

//   // 모든것을 선택하고 예약하기 버튼을 드디어 눌렀다!!! 서버로 post 해주자!
//   const bookDate = startDate?.toLocaleDateString().substring(0, 12);
//   const bookMatch = (name) => {
//     dispatch(
//       __postSpotsMatch({
//         place: name,
//         date: bookDate,
//         matchId: pickedTime + startDate + name,
//         isDouble: isTwo,
//         teamName: myTeam?.myteam,
//         member: count,
//         price: payPrice,
//       })
//     );
//   };

//   const MatchOkList = useSelector(
//     (state) => state?.matcher.matcher.doneMatching
//   );
//   console.log("오늘매치성사리스트", MatchOkList);

//   const timeSlots = MatchOkList?.map((match) => match.matchId.substring(0, 13));

//   return (
//     <>
//       <Layout>
//         <FlexibleHeader title={title} />
//         {selectSpot?.map((spot, idx) => {
//           return (
//             <WrapAll key={idx}>
//               <Sports>
//                 {spot.sports === "풋살장" && <>⚽</>}
//                 {spot.sports === "테니스장" && <>🥎</>}
//                 {spot.sports === "배드민턴장" && <>🏸</>}
//                 {spot.sports}
//               </Sports>
//               <SpotPhoto>
//                 <img alt="" src={spot.image} />
//               </SpotPhoto>
//               <PlaceInfo>
//                 <Title>{spot.spotName}</Title>
//                 <div>{spot.address}</div>
//                 <div>{spot.desc}</div>

//                 <MoreInfo>
//                   <li>시설 현황</li>
//                   <div>
//                     <div>
//                       {spot.spotKind === "실내 스팟" && <>🪴</>}
//                       {spot.spotKind === "실외 스팟" && <>🌳</>}
//                       {spot.spotKind}
//                     </div>
//                     <div>👍 {spot.comforts}</div>
//                   </div>
//                   <div>💰이용료 {spot.price}포인트</div>
//                 </MoreInfo>
//               </PlaceInfo>
//               {toggle && (
//                 <Calen>
//                   <ReactDatePicker
//                     locale={ko}
//                     selected={startDate}
//                     onChange={(date) => pickDateHandler(date, spot.spotName)}
//                     inline
//                     required
//                   />
//                   <Pick>
//                     <One onClick={clickedToggle}>닫기</One>
//                     <One onClick={exitMatchDate}>취소하기</One>
//                   </Pick>
//                 </Calen>
//               )}
//               {!toggle && (
//                 <SelectDone>
//                   <button onClick={clickedToggle}>
//                     <div>날짜를 선택해 주세요</div>
//                     <div>[ 선택 날짜 {bookDate}]</div>
//                   </button>
//                 </SelectDone>
//               )}

//               {toggleTwo && (
//                 <CalTime>
//                   <MakeMatch>
//                     <Times>
//                       <button
//                         disabled={timeSlots.includes(myTime[0])}
//                         // color={timeSlots.includes(myTime[0]) ? "red" : "auto"}
//                         onClick={() => teamPick(0, spot.price)}
//                       >
//                         {myTime[0]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[1])}
//                         onClick={() => teamPick(1, spot.price)}
//                       >
//                         {myTime[1]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[2])}
//                         onClick={() => teamPick(2, spot.price)}
//                       >
//                         {myTime[2]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[3])}
//                         onClick={() => teamPick(3, spot.price)}
//                       >
//                         {myTime[3]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[4])}
//                         onClick={() => teamPick(4, spot.price)}
//                       >
//                         {myTime[4]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[5])}
//                         onClick={() => teamPick(5, spot.price)}
//                       >
//                         {myTime[5]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[6])}
//                         onClick={() => teamPick(6, spot.price)}
//                       >
//                         {myTime[6]}
//                       </button>
//                       <button
//                         disabled={timeSlots.includes(myTime[7])}
//                         onClick={() => teamPick(7, spot.price)}
//                       >
//                         {myTime[7]}
//                       </button>
//                     </Times>
//                     <GoMatch>
//                       <button
//                         onClick={() => navigate(`/waitlist/${parseInt(id)}`)}
//                       >
//                         선택 날짜에 매칭을 기다리는 팀 둘러보기
//                       </button>
//                     </GoMatch>
//                   </MakeMatch>
//                   <Pick>
//                     <One onClick={clickedToggleTwo}>닫기</One>
//                     <One onClick={exitMatchTime}>취소하기</One>
//                   </Pick>
//                 </CalTime>
//               )}
//               {!toggleTwo && (
//                 <SelectDone2>
//                   <button
//                     disabled={bookDate === undefined}
//                     onClick={clickedToggleTwo}
//                   >
//                     <div>팀매칭하기</div>
//                     <div>[ 선택 시간 {pickedTime} ]</div>
//                   </button>
//                 </SelectDone2>
//               )}

//               <SelectChoice>
//                 <TeamSelect
//                   name="myteam"
//                   required
//                   value={myTeam?.teamName}
//                   onChange={pickMyTeam}
//                 >
//                   <option>---선택하기---</option>
//                   {myTeams?.map((myTeam) => {
//                     return (
//                       <option key={myTeam.teamId} value={myTeam.teamName}>
//                         {myTeam.teamName}
//                       </option>
//                     );
//                   })}
//                 </TeamSelect>
//                 <Counter>
//                   {count === 0 ? (
//                     <button disabled onClick={() => setCount(count - 1)}>
//                       -
//                     </button>
//                   ) : (
//                     <button onClick={() => setCount(count - 1)}>-</button>
//                   )}
//                   <span>{count}</span>
//                   <button onClick={() => setCount(count + 1)}>+</button>
//                 </Counter>
//               </SelectChoice>

//               {!isTwo && spot.sports !== "풋살장" && (
//                 <Pick>
//                   <One onClick={pickTwoHandler}>단식</One>
//                   <Two onClick={pickTwoHandler}>복식</Two>
//                 </Pick>
//               )}
//               {isTwo && spot.sports !== "풋살장" && (
//                 <Pick>
//                   <Two onClick={pickTwoHandler}>단식</Two>
//                   <One onClick={pickTwoHandler}>복식</One>
//                 </Pick>
//               )}

//               <CalTime>
//                 <p>잔여포인트: {myPoint} point</p>
//                 <span>예약포인트: {payPrice} point</span>

//                 {myPoint > payPrice ? (
//                   <p>결제후포인트: {myPoint - payPrice} point</p>
//                 ) : (
//                   <p>
//                     충전이 필요한 포인트: {payPrice - myPoint}
//                     point
//                   </p>
//                 )}
//               </CalTime>

//               <FinalBooking onClick={() => bookMatch(spot.spotName)}>
//                 매칭생성하기
//               </FinalBooking>
//             </WrapAll>
//           );
//         })}
//         <TapBar />
//       </Layout>
//     </>
//   );
// };

// export default Matching;
