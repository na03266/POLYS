import React, { useState, useEffect } from 'react';

function App() {
  const [currentHourMinute, setCurrentHourMinute] = useState(getHourMinute());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHourMinute(getHourMinute());
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
    return `${hours < 10 ? '0' : ''}${hours}시 ${minutes < 10 ? '0' : ''}${minutes}분`;
  }

  const clock = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh', // 화면 높이의 100%를 사용하여 화면 가운데에 정렬
  };
  

  // 시간 표시 부분의 글꼴 크기 스타일
  const timeStyle = {
    fontSize: '100px', // 원하는 크기로 조절하세요
    fontWeight: 'bold', // 원하는 폰트 두께로 조절하세요
    margin:'200px',
    color:'rgb(255, 50, 0)',
    
  };

  return (
    <div>
    
    
    <div style={clock}>
      {/* <p style={{fontSize:'50px'}}>현재시간</p> */}
      <p style={timeStyle}>{currentHourMinute}</p>
    </div>
    </div>
  );
}

export default App;
