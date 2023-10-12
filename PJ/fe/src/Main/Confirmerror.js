import React, { useEffect, useState } from "react";
import './css/Confirmerror.css'

function Confirmerror() {
  const [countdown, setCountdown] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  const goRegist = () => {
    window.location.href = "/regist";
  };

  const playErrorSound = () => {
    const audio = new Audio("/bgm/error.mp3"); // 오디오 파일 경로 설정
    audio.play();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      localStorage.removeItem('studentName');
      localStorage.removeItem('studentID');
      window.location.href = '/';
    }, 5000);

    // 인식 에러 발생 시 오디오 재생
    playErrorSound();

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [currentTime]);

  const buttonStyle = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
  };
  return (
    <div className="CEinsickno">
      <h2 className="noinsick">
        인식이 안됩니다.
        <br></br>
        카드로 인식해주세요.
      </h2>
      <button style={buttonStyle} onClick={goRegist} className="confirmBusignin">
        회원가입
      </button>
      <h3 className="errorcountdown">
        {countdown > 0 ? `${countdown}초 뒤에 홈 화면으로 이동합니다.` : '이동 중...'}        
      </h3>      
    </div>
  );
}

export default Confirmerror;
