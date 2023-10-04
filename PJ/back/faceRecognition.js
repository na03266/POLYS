const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cv = require('opencv4nodejs'); //npm install express opencv4nodejs


app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = 3000;
http.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

// <!DOCTYPE html>
// <html>
// <head>
//   <title>실시간 얼굴 인식</title>
// </head>
// <body>
//   <h1>실시간 얼굴 인식</h1>
//   <video id="video" width="640" height="480" autoplay></video>
//   <canvas id="canvas" width="640" height="480"></canvas>
//   <script src="/socket.io/socket.io.js"></script>
//   <script>
//    // 웹캠 액세스 및 얼굴 인식을 위한 JavaScript 코드
//    // 비디오 요소와 캔버스 요소에 대한 참조 가져오기
//  const video = document.getElementById('video');
//  const canvas = document.getElementById('canvas');
//  const context = canvas.getContext('2d');

//  // 웹캠 액세스
//  async function startCamera() {
//      try {
//          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//          video.srcObject = stream;
//      } catch (error) {
//          console.error('웹캠 액세스 에러:', error);
//      }
//  }

//  // OpenCV 로딩 및 얼굴 검출
//  function onOpenCvReady() {
//      // OpenCV 초기화
//      cv.onRuntimeInitialized = () => {
//          startCamera();
//          detectFace();
//      };
//  }

//  // 얼굴 검출
//  async function detectFace() {
//      const cap = new cv.VideoCapture(video);
//      const classifier = new cv.CascadeClassifier();
//      classifier.load('haarcascade_frontalface_default.xml'); // 얼굴 검출 모델 파일 로드

//      const faceColor = new cv.Scalar(0, 255, 0, 255); // 얼굴 표시 색상 (녹색)
     
//      const faces = new cv.RectVector();
     
//      const frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);

//      while (true) {
//          cap.read(frame);
//          classifier.detectMultiScale(frame, faces);
         
//          for (let i = 0; i < faces.size(); ++i) {
//              const face = faces.get(i);
//              const point1 = new cv.Point(face.x, face.y);
//              const point2 = new cv.Point(face.x + face.width, face.y + face.height);
//              cv.rectangle(frame, point1, point2, faceColor, 2);
//          }

//          cv.imshow(canvas, frame);
//          requestAnimationFrame(detectFace);
//      }
//  }
// </script>
// </body>
// </html>
