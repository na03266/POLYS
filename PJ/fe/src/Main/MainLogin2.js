import React from 'react'

function MainLogin2() {
    const studentName = localStorage.getItem("studentName");
  return (
    <div><h1>{studentName}님 ㅎㅇ요</h1></div>
  )
}

export default MainLogin2