import React from 'react'

function Home() {
    const goAdmin = () => {               
        window.location.href='/admin';
      };
      const goRegist = () => {               
        window.location.href='/regist';
      };
  return (
    <div>
        <button onClick={goAdmin}>관리자 페이지</button>
        <button onClick={goRegist}>회원가입</button>
    </div>
  )
}

export default Home