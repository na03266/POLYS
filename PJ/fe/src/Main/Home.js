import React from 'react'

function Home() {
    const goAdmin = () => {               
        window.location.href='/admin';
      };
    const goRegist = () => {               
      window.location.href='/regist';
    };
    const goLogin = () => {               
      window.location.href='/login';
    };
  return (
    <div>
        <button onClick={goAdmin}>관리자 페이지</button>
        <button onClick={goRegist}>회원가입</button>
        <button onClick={goLogin}>로그인</button>
    </div>
  )
}

export default Home