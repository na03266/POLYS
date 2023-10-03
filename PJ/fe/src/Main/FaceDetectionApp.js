import React, { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';

const modelURL = '/models/';

function ImageClassifierApp() {
  const videoRef = useRef();
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // 모델 파일 및 메타데이터 파일을 로드합니다.
    async function loadModel() {
      const model = await tmImage.load(modelURL + 'model.json', modelURL + 'metadata.json');

      // 웹캠 비디오 요소를 가져옵니다.
      const video = videoRef.current;

      // 비디오 메타데이터가 로드되면 화면에 비디오를 표시하고 분류 작업을 시작합니다.
      video.onloadedmetadata = () => {
        video.play(); // 비디오 재생 시작

        setInterval(async () => {
          // 비디오 프레임을 캡처하여 분류 작업을 수행합니다.
          const prediction = await model.predict(video);

          // 모든 라벨 및 확률을 가져와서 상태 변수에 저장합니다.
          const labelProbabilities = prediction.map((result) => ({
            label: result.className,
            probability: (result.probability * 100).toFixed(2) + '%',
          }));

          setLabels(labelProbabilities);
        }, 1000); // 1초마다 이미지 분류 및 결과 업데이트
      };

      // 웹캠 비디오 스트림을 가져와 비디오 요소에 연결합니다.
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
      });
    }

    loadModel();
  }, []);

  return (
    <div className="App">
      <h1>Image Classifier</h1>
      <p>Classified Labels:</p>
      <ul>
        {labels.map((item, index) => (
          <li key={index}>
            {item.label}: {item.probability}
          </li>
        ))}
      </ul>
      <video ref={videoRef} autoPlay muted width="500" height="500" />
    </div>
  );
}

export default ImageClassifierApp;
