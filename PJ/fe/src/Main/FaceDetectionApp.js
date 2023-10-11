import React, { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import axios from 'axios';

const modelURL = '/models/';

function FaceDetectionApp() {
  const [studentID, setStudentID] = useState(null); // 학번 상태 변수 추가
  const [currentTime, setCurrentTime] = useState(new Date());
  const videoRef = useRef();
  const [labels, setLabels] = useState([]);
  const [confirmedLabel, setConfirmedLabel] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [attendanceBoolean, setAttendanceBoolean] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부 상태 변수

  // 학생 이름과 학번을 매핑하는 객체
  const studentIDMap = {
    subin: 5,
    minjin: 1,
    hwangje: 3,
    jinhee: 4,
    kwangsik: 2,
  };
  

  useEffect(() => {
    // 모델 파일 및 메타데이터 파일을 로드합니다.
    async function loadModel() {
      const model = await tmImage.load(modelURL + 'model.json', modelURL + 'metadata.json');

      // 웹캠 비디오 요소를 가져옵니다.
      const video = videoRef.current;

      // 비디오 메타데이터가 로드되면 화면에 비디오를 표시하고 분류 작업을 시작합니다.
      video.onloadedmetadata = () => {
        video.play(); // 비디오 재생 시작

        let consecutiveTime = 0; // 연속 시간 카운터 초기화

        const intervalId = setInterval(async () => {
          // 비디오 프레임을 캡처하여 분류 작업을 수행합니다.
          const prediction = await model.predict(video);

          // 모든 라벨 및 확률을 가져와서 상태 변수에 저장합니다.
          const labelProbabilities = prediction.map((result) => ({
            label: result.className,
            probability: (result.probability * 100).toFixed(2),
          }));

          setLabels(labelProbabilities);

          if (!confirmedLabel) {
            // 아직 라벨이 확정되지 않았으면 가장 높은 확률을 가진 라벨을 확정합니다.
            const maxProbabilityLabel = labelProbabilities.reduce((prev, current) => {
              return prev.probability > current.probability ? prev : current;
            });

            if (maxProbabilityLabel.probability >= 50) {
              // 50% 이상 확률이 있는 경우에만 확정합니다.
              consecutiveTime += 1; // 1초마다 연속 시간 카운터 증가
              if (consecutiveTime >= 5) {
                // 5초 이상 같은 라벨이 연속으로 나온 경우 확정합니다.
                setConfirmedLabel(maxProbabilityLabel.label);
                setStudentID(studentIDMap[maxProbabilityLabel.label.toLowerCase()]); // 학생 이름에 해당하는 학번 설정
                setShowModal(true); // 모달 표시
              }
            } else {
              consecutiveTime = 0; // 확률이 낮으면 연속 시간 카운터 초기화
            }
          }
        }, 1000); // 1초마다 이미지 분류 및 결과 업데이트
      };

      // 웹캠 비디오 스트림을 가져와 비디오 요소에 연결합니다.
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
      });
    }

    loadModel();
  }, []);

  useEffect(() => {
    // "confirmedLabel"이 변경될 때 학생 이름에 해당하는 학번 설정
    if (confirmedLabel) {
      setStudentID(studentIDMap[confirmedLabel.toLowerCase()]);
    }
  }, [confirmedLabel]);

  // "예" 버튼을 클릭하여 확인할 때 실행되는 함수
  const handleYesClick = () => {
    
    handleLogin();

    setShowModal(false); // 모달 닫기
  };

  // "아니오" 버튼을 클릭하여 확인할 때 실행되는 함수
  const handleNoClick = () => {
    setShowModal(false); // 모달 닫기
    window.location.href = '/Confirmerror';
  };

  const handleLogin = async () => {
    try {
      if (!studentID) {
        // 학번이 설정되지 않은 경우 처리
        setLoginError('학생 이름이 매핑되지 않았습니다.');
        return;
      }

      // 서버에 학번을 전달하여 로그인 요청
      const response = await axios.post('http://192.168.10.145:3003/api/login', {
        studentID: studentID,
      });
      console.log(studentID);

      if (response.status === 200) {
        // 로그인이 성공한 경우
        const data = response.data;

        // 로컬 스토리지에 학생 이름과 학번 저장
        localStorage.setItem('studentName', data.studentName);
        localStorage.setItem('studentID', data.studentID);

        // 현재 시간을 기준으로 출석 여부 판단
        const isBeforeNineAM = currentTime.getHours() < 9;
        const attendanceStatus = isBeforeNineAM ? 0 : 1;
        setAttendanceBoolean(attendanceStatus);
        

        // 출석 정보를 서버로 POST 요청 보내기
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${year}-${month}-${day}`;
         
        await axios.post('http://192.168.10.145:3003/api/loginAttend', {
          attendanceTime: formattedToday,
          studentID,
          attendanceBoolean: attendanceStatus,
        });

        console.log('출석이 기록되었습니다.');

        // 로그인 후 페이지 이동
        window.location.href = '/Confirmok';
      } else {
        // 로그인 실패 시 에러 메시지 표시
        const errorData = response.data;
        setLoginError(errorData.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setLoginError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="App">
      <h1>Face Detection App</h1>
      <p>Detected Faces:</p>
      <ul>
        {labels.map((item, index) => (
          <li key={index}>
            {item.label}: {item.probability}%
          </li>
        ))}
      </ul>
      {confirmedLabel && (
        <div>
          <p>Confirmed Label: {confirmedLabel}</p>
          {showModal && (
            <div className="modal">
              <p>{confirmedLabel}님이 맞으십니까?</p>
              <button onClick={handleYesClick}>예</button>
              <button onClick={handleNoClick}>아니오</button>
            </div>
          )}
        </div>
      )}
      <video ref={videoRef} autoPlay muted width="500" height="500" />
      <style>
        {`
          .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal p {
            font-size: 24px;
            color: white;
          }
          .modal button {
            margin: 10px;
            padding: 10px 20px;
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
}

export default FaceDetectionApp;