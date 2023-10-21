import React from 'react'
import FaceDetectionApp from './FaceDetectionApp';

function Confirm() {

  const goHome = () =>{
    window.location.href = '/';
  };


  return (
    <div className='confirm-container slide-in-right'>
      <FaceDetectionApp/>
        <h2 className='donmove'>움직이지 말고 정면을 보세요</h2>
        <div className='qrbackBcontainer'>
        <button className='qrbackB' onClick={goHome}>뒤로가기</button>
        </div>
    </div>
  );
}

export default Confirm