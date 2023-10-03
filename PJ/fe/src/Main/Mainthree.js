import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Mainthree() {
  const sceneRef = useRef();
  const camera = new THREE.PerspectiveCamera(75, 300 / 500, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    const scene = new THREE.Scene();
    renderer.setSize(300, 500); // 크기 조정
    sceneRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    renderer.setClearColor(0xffffff); // 0xffffff는 흰색을 나타내는 16진수입니다.

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 카메라 위치 조정
    camera.position.set(0, 0, 2);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  

  return <div ref={sceneRef}></div>;
}

export default Mainthree;
