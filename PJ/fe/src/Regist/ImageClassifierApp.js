// import React, { Component } from 'react';
// import ml5 from 'ml5';

// class ImageClassifierApp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       label: '',
//     };
//   }

//   componentDidMount() {
//     // Load the image model
//     const imageModelURL = './my_model/';
//     this.classifier = ml5.imageClassifier(imageModelURL + 'model.json', () => {
//       this.startWebcam();
//     });
//   }

//   startWebcam() {
//     // Create a video element
//     this.video = document.createElement('video');
//     this.video.setAttribute('playsinline', '');
//     document.body.appendChild(this.video);

//     // Start capturing webcam data
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: false })
//       .then((stream) => {
//         this.video.srcObject = stream;
//         this.video.play();
//         this.classifyVideo();
//       });
//   }

//   classifyVideo() {
//     // Classify the video frame
//     this.classifier.classify(this.video, (error, results) => {
//       if (error) {
//         console.error(error);
//         return;
//       }
//       const label = results[0].label;
//       this.setState({ label });
//       this.classifyVideo(); // Continue classifying frames
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Image Classifier</h1>
//         <p>Classified Label: {this.state.label}</p>
//       </div>
//     );
//   }
// }

// export default ImageClassifierApp;