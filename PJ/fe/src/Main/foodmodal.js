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
              <div style={{ display: 'flex'}}>
                {menuData.map((dayMenu, index) => (
                  <div key={index} style={{ flex: '1', marginRight:'20px' }}>
                    <h3>{dayMenu.date}</h3>
                    <pre className="yoyo">
                      <strong><h3> 점심</h3></strong>
                      {dayMenu.menu
                        .split('\n') 
                        .map((menuItem, itemIndex) => {
                          const trimmedMenuItem = menuItem.trim();
                          return itemIndex === 0 ? `  ${trimmedMenuItem.replace(/,/g, '')}` : ` ${trimmedMenuItem.replace(/,/g, '')}`;
                        }) 
                        .join('\n')} 
                    </pre>
                    <pre>
                      <strong><h3> 저녁</h3></strong>
                      {dayMenu.mealType
                        .split('\n') 
                        .map((menuItem, itemIndex) => {
                          const trimmedMenuItem = menuItem.trim();
                          return itemIndex === 0 ? `  ${trimmedMenuItem.replace(/,/g, '')}` : ` ${trimmedMenuItem.replace(/,/g, '')}`;
                        }) 
                        .join('\n')} 
                    </pre>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default FoodModal;
