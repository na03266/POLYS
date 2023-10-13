import React, { useState } from 'react';
import axios from 'axios';

function GuestFace() {    
  const [imageURL, setImageURL] = useState('');
  const [faceData, setFaceData] = useState(null);
  const [apiKey] = useState('8017891711cd433088f463eeff797f05');
  const [endpoint] = useState('https://kwangsik.cognitiveservices.azure.com');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the image to Azure Face API
      const response = await axios.post(`${endpoint}/detect?returnFaceId=true&returnFaceAttributes=age,gender`, formData, {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/octet-stream',
        },
      });

      // Get face data
      setFaceData(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h1>Azure Face API Demo</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {faceData && faceData.length > 0 && (
        <div>
          <h2>Detected Faces:</h2>
          {faceData.map((face, index) => (
            <div key={index}>
              <p>Face {index + 1}</p>
              <p>Age: {face.faceAttributes.age}</p>
              <p>Gender: {face.faceAttributes.gender}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestFace;
