import React, { useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import Link from "react-router-dom";

const DropDown = () => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}> mypage</button>
      <ul ref={dropDownRef}>
        <li>
          <Link href="/mypage">마이페이지</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
