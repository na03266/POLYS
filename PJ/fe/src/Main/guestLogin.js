import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <img src='./qr.jpeg' alt="QR Code" />
    </div>
  );
}

export default GuestLogin;
