import React, { useState } from 'react';
import axios from 'axios'; 

function Regist() {
    const [registError, setregistError] = useState(null);
    const [studentName, setstudentName ] = useState('');
    const [studentNumber, setstudentNumber ] = useState('');
    const [studentAuthentication1, setstudentAuthentication1 ] = useState('');   
    const [studentAuthentication2, setstudentAuthentication2] = useState('');

    const handleRegist= async () => {
        try {
          const response = await axios.post('http://192.168.10.145:3003/api/regist', 
          { studentName, studentNumber, studentAuthentication1, studentAuthentication2 });
          console.log({ studentNumber, studentName, studentAuthentication1, studentAuthentication2 });

          if (response.status === 200) {             
            window.location.href='/registWait'
          } else {
            const errorData = response.data;
            setregistError(errorData.message || '회원가입 실패');
          }
        } catch (error) {
          console.error('회원가입 오류:', error);
          setregistError('회원가입 중 오류가 발생했습니다.');
        }
      };
  return (
    <div className='title'>회원가입
        <button type="button" onClick={handleRegist}>
        다음
        </button>
        <div>이름</div>
            <input 
            type="studentName"
            placeholder="이름을 입력하세요"
            value={studentName}
            onChange={(e) => setstudentName(e.target.value)}
            required></input>
        <div>학번</div>
            <input
            type="studentNumber"
            placeholder="학번을 입력하세요"
            value={studentNumber}
            onChange={(e) => setstudentNumber(e.target.value)}
            required></input>
    </div>
  )
}

export default Regist