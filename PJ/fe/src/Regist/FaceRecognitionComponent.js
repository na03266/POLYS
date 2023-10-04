// import React, { useState, useEffect, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as knnClassifier from '@tensorflow-models/knn-classifier';
// import * as mobilenetModule from '@tensorflow-models/mobilenet';
// import Webcam from 'react-webcam';

// function FaceRecognitionComponent() {
//   const webcamRef = useRef(null);
//   const [knnModel, setKnnModel] = useState(null);
//   const [mobileNetModel, setMobileNetModel] = useState(null);
//   const [isRecognizing, setIsRecognizing] = useState(false);
//   const [recognizedFace, setRecognizedFace] = useState(null);

//   useEffect(() => {
//     async function setupModels() {
//       const knn = knnClassifier.create();
//       const mobilenet = await mobilenetModule.load();
  
//       setKnnModel(knn);
//       setMobileNetModel(mobilenet);
  
//       // 모델 초기화가 완료되면 이미지 캡처 및 얼굴 인식 시작
//       captureImage();
//     }
  
//     setupModels();
//   }, []);

//   const handleUserMedia = (stream) => {
//     // 웹캠 초기화가 완료된 후 호출되는 콜백 함수
//     webcamRef.current.video.srcObject = stream; // 웹캠 스트림을 video 요소에 할당

//     // 이미지를 주기적으로 캡처하려면 타이머를 사용
//     const captureInterval = setInterval(captureImage, 5000); // 10초마다 이미지 캡처

//     return () => {
//       // 컴포넌트 언마운트 시 타이머 정리
//       clearInterval(captureInterval);
//     };
//   };

//   const captureImage = async () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
      
  
//       // 이미지가 캡처되었는지 확인
//       if (imageSrc) {
//         console.log('이미지 캡처 성공'); // 이미지가 캡처되었을 때 로그 추가
  
//         const img = new Image();
//         img.src = imageSrc;
  
//         // 이미지가 로드되면 이벤트 리스너를 사용하여 텐서로 변환
//         img.onload = async () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0, img.width, img.height);
//           const imageData = ctx.getImageData(0, 0, img.width, img.height);
  
//           // knnModel이 초기화되었는지 확인
//           if (knnModel !== null) {
//             const tensor = tf.browser.fromPixels(imageData);
//             const tensorData = tensor.arraySync(); // 텐서 데이터를 배열로 변환
//             const tensorJsonString = JSON.stringify(tensorData); // 배열을 JSON 문자열로 변환
//             console.log('텐서 데이터(JSON):', tensorJsonString);

  
//             // tensor를 사용하여 필요한 작업 수행
//             const numClasses = knnModel.getNumClasses();
//             if (numClasses > 0) {
//               const embeddings = mobileNetModel.infer(tensor, true);
//               const result = await knnModel.predictClass(embeddings);
//               setRecognizedFace(result.label);
//               console.log(setRecognizedFace);
//             }
//           } else {
//             console.error('KNN 모델이 아직 초기화되지 않았습니다.'); 
//           }
  
//           setIsRecognizing(false);
//         };
//       } else {
//         console.error('웹캠 이미지 캡처 실패');
//         setIsRecognizing(false);
//       }
//     }
//   };

//   const captureAndRecognizeFace = async () => {
//     setIsRecognizing(true);
  
//     // 3초의 지연 시간을 둡니다.
//     setTimeout(() => {
//       captureImage();
//       setIsRecognizing(false);
//     }, 3000); // 3초 (3000 밀리초)의 지연 시간
//   };
//   return (
//     <div>
//       <Webcam
//         ref={webcamRef}
//         onUserMedia={handleUserMedia}
//       />
//       <button onClick={captureAndRecognizeFace} disabled={isRecognizing}>
//         Recognize Face
//       </button>
//       {recognizedFace !== null && (
//         <p>Recognized Face: {recognizedFace}</p>
//       )}
//     </div>
//   );
// }

// export default FaceRecognitionComponent;
