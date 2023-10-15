import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/guestLogin.css'

function GuestLogin() {
  const [guestID, setGuestID] = useState(null);

  useEffect(() => {
    let initialGuestID = null;
    const interval = setInterval(() => {
      axios
        .get('http://192.168.10.145:3003/api/getGuestID')
        .then((response) => {
          const newGuestID = response.data.latestGuestID;
          console.log(initialGuestID);

          if (initialGuestID === null) {
            initialGuestID = newGuestID;
          }

          if (guestID !== newGuestID && initialGuestID !== newGuestID) {
            setGuestID(newGuestID);
            window.location.href = '/gF';
            localStorage.setItem('guestID', newGuestID);
          }
        })
        .catch((error) => {
          console.error('에러 발생:', error);
        });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [guestID]);

  return (
    
    <div>
      <div>
        <h2 className='QRjinhanggo' style={{ textAlign:'center' }}>QR로 비회원 등록을 진행해주세요.</h2>
      </div>
    <div className='qrimgcontainer'>
      <img className='qrimg' src='./qr.jpeg' alt="QR Code" style={{ width: '500px', height: '500px' }}/>
    </div>
    </div>
  );
}

export default GuestLogin;
