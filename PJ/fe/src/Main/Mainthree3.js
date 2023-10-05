import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeScene extends Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(300, 500);
    this.renderer.setClearColor(0xffffff);

    this.camera.position.z = 5;
    this.controls = null;
    this.model = null;
    this.target = new THREE.Vector3();

    // 주변 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 색상과 강도 조절
    this.scene.add(ambientLight);

    // 디렉셔널 라이트 추가
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 색상과 강도 조절
    directionalLight.position.set(1, 1, 1); // 광원의 위치 설정
    this.scene.add(directionalLight);
  }

  componentDidMount() {
    this.mount.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 1;
    this.controls.maxDistance = 10;

    const loader = new GLTFLoader();

    loader.load(
      "/blender/hwangjae.gltf",
      (gltf) => {
        this.model = gltf.scene;

        this.model.scale.set(0.85, 0.85, 0.85);
        const boundingBox = new THREE.Box3().setFromObject(this.model);
        boundingBox.getCenter(this.target);
        this.model.position.set(0, -1, 0);
        this.model.rotation.x = THREE.MathUtils.degToRad(20);
        this.scene.add(this.model);

        
      },
      undefined,
      (error) => {
        console.error("Failed to load glTF model", error);
      }
    );

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.target.copy(this.target);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return <div ref={(ref) => (this.mount = ref)} style={{ width: "300px", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }} />;
  }
}

export default ThreeScene;
