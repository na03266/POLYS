import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GuestWelcome() {
  const [guestInfo, setGuestInfo] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 guestID 가져오기
    const guestID = localStorage.getItem('guestID');

    if (guestID) {
      // 서버에 guestID를 보내서 정보를 가져오기
      axios
        .get(`http://192.168.10.145:3003/api/getGuestInfo/${guestID}`)
        .then((response) => {
          const { guestName, guestPurpose } = response.data;

          if (guestName === '하정미') {
            // guestName이 '하정미'인 경우에만 다른 경로로 이동
            window.location.href = '/HakJangNim'; // 이동하고자 하는 페이지 경로로 변경
          } else {
            setGuestInfo({ guestName, guestPurpose });
          }
        })
        .catch((error) => {
          console.error('에러 발생:', error);
        });
    }


    // 5초 후에 루트 주소로 이동하고 guestID 값을 로컬 스토리지에서 삭제
    const timeout = setTimeout(() => {
      localStorage.removeItem('guestID');
      window.location.href = '/';
    }, 5000);

    // 컴포넌트 언마운트 시 timeout 정리
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100rem', // 화면 높이에 따라 조절하십시오.
      fontSize: '30px'
    }}>
    {guestInfo ? (
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '5rem'}}>{`어서오세요 ${guestInfo.guestName}님!`}</span><br></br>
        <p>{`${guestInfo.guestPurpose} 목적으로 방문하신 것을 진심으로 환영합니다.`}</p>
      </div>
    ) : (
      <p>로딩 중...</p>
    )}
  </div>
);
}

export default GuestWelcome;
