import React from 'react'

function Home() {
    const goAdmin = () => {               
        window.location.href='/admin';
      };
  return (
    <div>
        <button onClick={goAdmin}>관리자 페이지</button>
    </div>
  )
}

export default Home