import React, { useState, useEffect } from 'react';
import './FoodModal.css';
import axios from 'axios'; // Import Axios

const FoodModal = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [lunchData, setLunchData] = useState(null);
  const [dinnerData, setDinnerData] = useState(null);

  // 모달을 열 때 데이터를 가져오는 useEffect
  useEffect(() => {
    // 데이터를 가져오는 비동기 함수를 호출합니다.
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.10.157:3003/api/todayMenu'); // Replace with the URL to your JSON data.
        const data = response.data;
        setLunchData(data.lunch); // 서버에서 가져온 lunch 데이터를 설정합니다.
        setDinnerData(data.dinner); // 서버에서 가져온 dinner 데이터를 설정합니다.
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  }, []);

  // 모달을 닫을 때 사용하는 함수
  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <div className={`food-modal ${isModalOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>닫기</button>
        <h2>점심 메뉴</h2>
        <pre>{lunchData}</pre>
        <h2>저녁 메뉴</h2>
        <pre>{dinnerData}</pre>
      </div>
    </div>
  );
};

export default FoodModal;
