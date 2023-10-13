import React, { useEffect, useState } from 'react';
import './css/Confirmok.css';
import { getSpeech } from './getSpeech';

function Confirmok() {
  const [value, setValue] = useState("안녕하세요");
  const [countdown, setCountdown] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  const studentName = localStorage.getItem('studentName');

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const speakLocalStorageValues = () => {
    const studentName = localStorage.getItem('studentName');

    if (studentName) {
      const message = `...${studentName}님,.
       출석 완료되었습니다.`;
      getSpeech(message);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);

      if (countdown === 5) {
        speakLocalStorageValues();
      }
      if (countdown === 0) {
        window.location.href = '/';
      }
      
    }, 1000);

    // TTS를 먼저 실행하고 localStorage 값을 삭제하도록 수정
    const redirectTimer = setTimeout(() => {
      localStorage.removeItem('studentName');
      localStorage.removeItem('studentID');
      window.location.href = '/';
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [countdown]);

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
    <div className='oktext'>
      <h1 className='nimhi'>
        {studentName}님 ㅎㅇ요 <br />출석시간 {formatTime(currentTime)}
      </h1>

      <h3 className='okcountdown'>
        {countdown > 0 ? `${countdown}초 뒤에 홈 화면으로 이동합니다.` : '이동 중...'}
      </h3>
    </div>
  );
}

export default Confirmok;
