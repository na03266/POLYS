import React from 'react'
import { AiFillCaretLeft } from "react-icons/ai"
import { AiFillCaretRight } from "react-icons/ai"


function RegistCustomizing() {
  const handleRegistWait = () => {               
    window.location.href='/registWait';
  };
  const handleRegistLast = () => {               
    window.location.href='/registLast';
  };

  return (
    <div>
      <button onClick={handleRegistWait}>이전</button>
      <button onClick={handleRegistLast}>다음</button>
      <br/ >
      <button className='cm_bt'>
        <AiFillCaretLeft />
      </button>
      머리1
      <button className='cm_bt'>
        <AiFillCaretRight />
      </button>
      <br/ >
      <button className='cm_bt'>
        <AiFillCaretLeft />
      </button>
      표정1
      <button className='cm_bt'>
        <AiFillCaretRight />
      </button>
    </div>
  )
}

export default RegistCustomizing