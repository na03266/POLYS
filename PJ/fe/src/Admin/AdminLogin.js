import React, { useState } from 'react';
import axios from 'axios';
import './css/AdminLogin.css';

function AdminLogin() {
  const [loginError, setLoginError] = useState(null);
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.10.157:3003/api/adminLogin', {
        Password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('Name', data.Name);
        window.location.href = '/adminMenu';
      } else {
        const errorData = response.data;
        setLoginError(errorData.message || '로그인 실패');
        alert(loginError); // 경고 메시지 표시
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setLoginError('로그인 중 오류가 발생했습니다.');
      alert(loginError); // 경고 메시지 표시
    }
  };

  return (
    <div className='LoginDiv'>
      <h1 className='Loginh'>관리자 로그인</h1>
      <input
        type="password" // "Password" 대신 "password"로 수정
        placeholder="비밀번호를 입력하세요"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default AdminLogin;
