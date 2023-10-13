import React from 'react'

function gF() {
    const goguestWelcome = () => {
        window.location.href = '/guestWelcome';
      };
    
  return (
    <div>여기서 이제 Guest 얼굴인식 할꺼임<br></br>
        <button onClick={goguestWelcome}
        >임시 다음으로</button>
    </div>
  )
}

export default gF