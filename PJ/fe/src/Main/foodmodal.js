import React, { useState, useEffect } from 'react';
import './FoodModal.css';
import axios from 'axios';

const FoodModal = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.10.157:3003/api/todayMenu');
        const data = response.data.menu;

        // 토요일과 일요일 데이터를 필터링
        const filteredMenuData = data.filter((dayMenu) => {
          return !dayMenu.date.includes('토요일') && !dayMenu.date.includes('일요일');
        });

        setMenuData(filteredMenuData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <div className={`food-modal ${isModalOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>닫기</button>
        {menuData && (
          <>
            {menuData.map((dayMenu, index) => (
              <div key={index}>
                <h2>{dayMenu.date} 메뉴</h2>
                <pre>{dayMenu.menu}</pre>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FoodModal;
