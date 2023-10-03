import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Mainthree() {
  const sceneRef = useRef();
  const camera = new THREE.PerspectiveCamera(75, 300 / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    const scene = new THREE.Scene();
    renderer.setSize(300, 500);
    sceneRef.current.appendChild(renderer.domElement);

    // 아이디 가져오기
    const loggedInStudentID = localStorage.getItem('studentID');

    // 만약 로그인한 아이디가 없거나 비어있는 경우 3D 객체를 보이지 않게 함
    if (!loggedInStudentID) {
      return;
    }

    // 만약 로그인한 아이디와 일치하는 경우에만 3D 객체를 보여줌
    if (loggedInStudentID === '1') {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      renderer.setClearColor(0xffffff);

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.set(0, 0, 2);

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return <div ref={sceneRef}></div>;
}

export default Mainthree;
