import React, { useState, useEffect } from 'react';
import './FoodModal.css';
import axios from 'axios';

const FoodModal = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.10.145:3003/api/todayMenu');
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

  const handleClick = (data) => {
    setSelectedData(data);
    setIsDataModalOpen(true);
  };

  const closeDataModal = () => {
    setIsDataModalOpen(false);
  };

  return (
    <div className={`food-modal ${isModalOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>닫기</button>
        {menuData && (
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>점심</th>
                <th>저녁</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((dayMenu, index) => (
                <tr key={index} onClick={() => handleClick(dayMenu)}>
                  <td>{dayMenu.date}</td>
                  <td>
                    <pre className="yoyo">
                      {dayMenu.menu
                        .split('\n')
                        .map((menuItem, itemIndex) => (
                          <div key={itemIndex} style={{ marginTop: itemIndex === 0 ? '0' : '10px' }}>{itemIndex === 0 ? ` ${menuItem.trim().replace(/,/g, '')}` : menuItem.trim().replace(/,/g, '')}</div>
                        ))}
                    </pre>
                  </td>
                  <td>
                    <pre className="dinner">
                      {dayMenu.mealType
                        .split('\n')
                        .map((menuItem, itemIndex) => (
                          <div key={itemIndex} style={{ marginTop: itemIndex === 0 ? '0' : '10px' }}>{itemIndex === 0 ? ` ${menuItem.trim().replace(/,/g, '')}` : menuItem.trim().replace(/,/g, '')}</div>
                        ))}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isDataModalOpen && selectedData && (
        <div className="data-modal">
          <div className="data-modal-content">
            <span className="close" onClick={closeDataModal}>&times;</span>
            <h2 style={{margin:'40px'}}>{selectedData.date}</h2>
            <table style={{width: '100%'}}>
      <thead>
        <tr>
          <th style={{width:'50%'}}>점심</th>
          <th style={{width:'50%'}}>저녁</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> 
            <pre className='extend-yoyo' style={{ fontSize: '25px'}}>
    {selectedData.menu.split(',').map((item, index) => (
      <div key={index} style={{ marginTop: '10px' }}>
        {item.trim()}
      </div>
    ))}
  </pre>
  </td>
          <td>
            <pre className='extend-dinner' style={{ fontSize:'25px'}}>
    {selectedData.mealType.split(',').map((item, index) => (
      <div key={index} style={{ marginTop: '10px' }}>
        {item.trim()}
      </div>
    ))}
  </pre>
  </td>
        </tr>
      </tbody>
    </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodModal;
