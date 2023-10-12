import React, { useState, useEffect } from 'react';
import './css/Clock.css';

function App() {
  const [currentHourMinute, setCurrentHourMinute] = useState(getHourMinute());
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHourMinute(getHourMinute());
      setCurrentDate(getFormattedDate());
    }, 60000); // 1분마다 업데이트

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 현재 시간에서 시와 분을 추출하고 문자열로 조합하는 함수
  function getHourMinute() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  // 현재 날짜를 형식화하는 함수
  function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 패딩
    const day = currentDate.getDate().toString().padStart(2, '0'); // 날짜를 2자리로 패딩
    return `${year}-${month}-${day}`;
  }

  const clock = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh', // 화면 높이의 100%를 사용하여 화면 가운데에 정렬
  };

  return (
    <div>
      <div style={clock}>
        <span className='dateStyle'>{currentDate}</span>
        <span className='timeStyle'>{currentHourMinute}</span>
      </div>
    </div>
  );
}

export default App;
