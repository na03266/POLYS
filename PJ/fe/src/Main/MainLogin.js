import React, {useState} from 'react'
import axios from 'axios';

function MainLogin() {
    const [loginError, setLoginError] = useState(null);
    const [studentNumber, setstudentNumber] = useState('');
    const [studentAuthentication1, setstudentAuthentication1] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [attendanceBoolean, setAttendanceBoolean] = useState(null);
  
    const handleLogin = async () => {
      try { 
        const response = await axios.post('http://localhost:3003/api/login', {
            studentNumber, studentAuthentication1,
        });        
  
        if (response.status === 200) { 
          const data = response.data;          
          localStorage.setItem('studentName', data.studentName);
          localStorage.setItem('studentID', data.studentID);
          window.location.href='/login2'

          try {
            // 현재 시간을 기준으로 출석 여부 판단
            const isBeforeNineAM = currentTime.getHours() < 9;
            const attendanceStatus = isBeforeNineAM ? 0 : 1;
            setAttendanceBoolean(attendanceStatus);
      
            // 출석 정보를 서버로 POST 요청 보내기
            const formattedAttendanceTime = currentTime.toISOString().slice(0, 19).replace('T', ' ');
            const studentID = localStorage.getItem('studentID');
            await axios.post('http://localhost:3003/api/loginAttend', {
              attendanceTime: formattedAttendanceTime,
              studentID,
              attendanceBoolean: attendanceStatus,
            });
            
            console.log('출석이 기록되었습니다.');
          } catch (error) {
            console.error('출석 기록에 실패했습니다.', error);
          }
        
        } else {
          const errorData = response.data;
          setLoginError(errorData.message || '로그인 실패');
        }
      } catch (error) {
        console.error('로그인 오류:', error);
        setLoginError('로그인 중 오류가 발생했습니다.');
      }
    };

   
      
     


    return (
        <div className='title'>회원가입
            <button type="button" onClick={handleLogin}>
                로그인
            </button>
        <div>
            학번
        </div>
        <input 
            type="studentNumber"
            placeholder="이름을 입력하세요"
            value={studentNumber}
            onChange={(e) => setstudentNumber(e.target.value)}
            required>
        </input>
        <div>
            인증정보
        </div>
        <input
            type="studentAuthentication1"
            placeholder="우선 비워놓으면됨"
            value={studentAuthentication1}
            onChange={(e) => setstudentAuthentication1(e.target.value)}
            required>
        </input>
    </div>
      );
    }
    
export default MainLogin