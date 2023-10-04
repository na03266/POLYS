import React, { useEffect, useState } from 'react';

function Confirmok() {
  const [countdown, setCountdown] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());


  const studentName = localStorage.getItem('studentName');

  

  

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      localStorage.removeItem('studentName');
      localStorage.removeItem('studentID');
      window.location.href = '/';
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [currentTime]); 

  // 한글로 월, 일, 시, 분, 초를 형식화하여 표시
  const formatTime = (date) => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];    
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${month} ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
  };

  return (
    <div>
      <h1>
        {studentName}님 ㅎㅇ요 <br></br>출석시간 {formatTime(currentTime)}
      </h1>
      <h3>
        {countdown > 0 ? `${countdown}초 뒤에 홈 화면으로 이동합니다.` : '이동 중...'}        
      </h3>
    </div>
  );
}

export default Confirmok;
