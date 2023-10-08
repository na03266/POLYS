import React from 'react'
import AdminUserList from './AdminUserList';
import './css/AdminUserInfo.css';
import { BsArrowUpCircle } from 'react-icons/bs';


function AdminUserInfo() {

    const goBack = () => {               
        window.location.href='/adminMenu';
      };
      
      const MoveToTop = () => {
        // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    
  return (
    <div>
        <button className='up_right' onClick={goBack}>뒤로가기</button><br></br>
        <AdminUserList/>
        <BsArrowUpCircle className="top_icon" size={30} onClick={MoveToTop}/> 
    </div>
  )
}

export default AdminUserInfo