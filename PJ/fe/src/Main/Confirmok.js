import React, { useEffect } from 'react';

function Confirmok() {
  useEffect(() => {
    // 5초(5000 밀리초) 후에 메인 홈 화면으로 이동
    const timeoutId = setTimeout(() => {
      window.location.href = '/'; // 메인 홈 화면으로 이동
    }, 1000); // 5초 뒤에 실행

    return () => {
      clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 타임아웃을 정리
    };
  }, []);

  return (
    <div>
      출석이 완료되었을 때
    </div>
  );
}

export default Confirmok;
