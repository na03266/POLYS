import React from 'react'
import ThreeBox from './ThreeBox';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {MdTouchApp} from 'react-icons/md';
import Clock from './Clock';


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
    const goConfirm = () => {
      window.location.href='/confirm';
    }
  return (
    <div>
        <Clock />
        <FaChalkboardTeacher style={{ fontSize: '150px', marginLeft:'auto', marginRight:'auto', display:'block' }} onClick={goAdmin} />
        <div className="three-container" >
          < ThreeBox /> {/* MainThree 컴포넌트를 원하는 div 내에 렌더링 */}
        </div>
        <button style={{border:'none', background:'none', fontSize:'35px', marginLeft:'auto', marginRight:'auto', display:'block', marginBottom:'100px'}} onClick={goConfirm}>출석하기<MdTouchApp /></button>
        <br></br>
        <button onClick={goRegist}>회원가입</button>
        <button onClick={goLogin}>로그인</button>
    </div>
  )
}

export default Home