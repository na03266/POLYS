import React, { useState } from 'react';
import axios from 'axios';

function GuestRegist() {
  const [guestName, setGuestName] = useState('');
  const [guestPurpose, setGuestPurpose] = useState('');

  const handleNameChange = (e) => {
    setGuestName(e.target.value);
  };

  const handlePurposeChange = (e) => {
    setGuestPurpose(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://192.168.10.145:3003/api/guestLogin'; // 서버 엔드포인트 URL

      const data = {
        guestName,
        guestPurpose,
      };

      const response = await axios.post(apiUrl, data);

      if (response.status === 200) {
        console.log('등록 성공:', response.data);
        if (window.confirm('등록이 완료되었습니다. 창을 닫으시겠습니까?')) {
          window.close();
        }
      } else {
        console.error('등록 실패:', response.data);
        // 실패 시 필요한 처리 수행
      }
    } catch (error) {
      console.error('등록 오류:', error);
      // 오류 처리
    }
  };

  return (
    <div>
      <h2>손님 등록 폼</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름:</label>
          <input type="text" value={guestName} onChange={handleNameChange} />
        </div>
        <div>
          <label>방문 목적:</label>
          <input type="text" value={guestPurpose} onChange={handlePurposeChange} />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default GuestRegist;
