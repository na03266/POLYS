import React, { useEffect, useState } from 'react'

function RegistWait() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
  const redirectTimer = setTimeout(() => {
    localStorage.removeItem('studentName');
    window.location.href = '/registCustomizing';
  }, 5000);
  return () => {  
    clearTimeout(redirectTimer);
  };
}, []);

  return (
    <div>
      <div>왼쪽 정면 오른쪽</div>
    인식중...
    <br/ >
    움직이지 말고
    <br/ >
    정면을 보세요
    <h3>{countdown > 0 ? `${countdown}초 뒤에 홈 화면으로 이동합니다.` : '이동 중...'}</h3>
    </div>
  )
}

export default RegistWait