import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FrontSide } from 'three';
import './css/QRLogin.css';

function QRLogin() {
  const [studentName, setStudentName] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [attendanceBoolean, setAttendanceBoolean] = useState(null);

  const studentIDMap = {
    subin: 5,
    minjin: 1,
    hwangje: 3,
    jinhee: 4,
    kwangsik: 2,
  };

  const currentTime = new Date();

  const handleLogin = async () => {
    try {
      if (!studentName) {
        setLoginError('학생 이름을 입력해주세요.');
        return;
      }

      // 학생 이름을 소문자로 변환
      const lowercaseName = studentName.trim().toLowerCase();
      const studentID = studentIDMap[lowercaseName];

      if (!studentID) {
        // 학번이 설정되지 않은 경우 처리        
        return;
      }

      // 서버에 학번을 전달하여 로그인 요청
      const response = await axios.post('http://192.168.10.145:3003/api/login', {
        studentID: studentID,
      });

      if (response.status === 200) {
        // 로그인이 성공한 경우
        const data = response.data;

        // 로컬 스토리지에 학생 정보 저장
        localStorage.setItem('studentName', data.studentName);
        localStorage.setItem('studentID', data.studentID);
        localStorage.setItem('studentGender', data.studentGender);

        // 현재 시간을 기준으로 출석 여부 판단
        const isBeforeNineAM = currentTime.getHours() < 9;
        const attendanceStatus = isBeforeNineAM ? 0 : 1;
        setAttendanceBoolean(attendanceStatus);

        // 출석 정보를 서버로 POST 요청 보내기
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${year}-${month}-${day}`;

        // 출석 정보를 서버로 보내는 요청 (서버 API에 맞게 수정 필요)
        await axios.post('http://192.168.10.145:3003/api/loginAttend', {
          attendanceTime: formattedToday,
          studentID,
          attendanceBoolean: attendanceStatus,
        });

        console.log('출석이 기록되었습니다.');

        // 로그인 후 페이지 이동
        window.location.href = '/Confirmok';
      } else {
        // 로그인 실패 시 에러 메시지 표시
        const errorData = response.data;
        setLoginError(errorData.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setLoginError('로그인 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (studentName) {
      handleLogin();
    }
  }, [studentName]);

  const goHome = () =>{
    window.location.href = '/';
  };
 

  return (
    <div>
      <div className='qrcontainer'>
        <div className='qrlogingcontainer'>
          <h2 className='qrloging'>QR로 로그인</h2>
          <h2 className='looo'>스캐너에 QR을 스캔해주세요</h2>
        </div>
        <input className='dddsdf'
          type="text"        
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          autoFocus
          style={{width:'0.1px', height:'0.1px'} }
        />
      </div>
      <div className='qrbackBcontainer'>
      <button className='qrbackB' onClick={goHome}>뒤로가기</button>
      </div>
    </div>
  );
}

export default QRLogin;
