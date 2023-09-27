import React, {useState} from 'react'
import axios from 'axios';

function MainLogin() {
    const [loginError, setLoginError] = useState(null);
    const [studentNumber, setstudentNumber] = useState('');
    const [studentAuthentication1, setstudentAuthentication1] = useState('');
  
    const handleLogin = async () => {
      try { 
        const response = await axios.post('http://localhost:3003/api/login', {
            studentNumber, studentAuthentication1,
        });        
  
        if (response.status === 200) { 
          const data = response.data;          
          localStorage.setItem('studentName', data.studentName);
          window.location.href='/login2'
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