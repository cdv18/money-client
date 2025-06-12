<template>
  <div class="logo-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const container = ref(null);
let scene, camera, renderer, logo;

const createLogo = () => {
  const group = new THREE.Group();

  // 1. Tạo đế đồng xu với màu gradient từ đỏ sang cam
  const coinBase = new THREE.CylinderGeometry(1, 1, 0.1, 64);
  const coinMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF4500,  // Màu đỏ-cam (OrangeRed)
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0xFF4500,
    emissiveIntensity: 0.2
  });
  const coin = new THREE.Mesh(coinBase, coinMaterial);
  coin.rotation.x = Math.PI / 2;

  // 2. Tạo viền đồng xu với độ sáng cao và màu cam sáng
  const ringGeometry = new THREE.TorusGeometry(0.9, 0.12, 16, 64);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xFF7F50,  // Màu san hô (Coral)
    metalness: 0.8,
    roughness: 0.1,
    emissive: 0xFF7F50,
    emissiveIntensity: 0.3
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  // 3. Tạo chữ "M" nổi 3D với màu sáng và độ phản xạ cao
  const createM = () => {
    const mGroup = new THREE.Group();
    
    const thickness = 0.08;
    const height = 0.4;
    const width = 0.5;
    
    const createBar = (start, end) => {
      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();
      
      const barGeometry = new THREE.CylinderGeometry(thickness/2, thickness/2, length, 8);
      const barMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,  // Màu trắng cho chữ M
        metalness: 0.9,   // Tăng độ metalness
        roughness: 0.1,   // Giảm roughness để tăng độ sáng
        emissive: 0xFFFFFF,
        emissiveIntensity: 0.2
      });
      
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.copy(start);
      bar.position.addScaledVector(direction, 0.5);
      bar.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      );
      
      return bar;
    };

    const points = {
      left: new THREE.Vector3(-width/2, -height/2, 0.15),
      leftTop: new THREE.Vector3(-width/2, height/2, 0.15),
      middle: new THREE.Vector3(0, 0, 0.15),
      rightTop: new THREE.Vector3(width/2, height/2, 0.15),
      right: new THREE.Vector3(width/2, -height/2, 0.15)
    };

    const leftBar = createBar(points.left, points.leftTop);
    const leftDiagonal = createBar(points.leftTop, points.middle);
    const rightDiagonal = createBar(points.middle, points.rightTop);
    const rightBar = createBar(points.rightTop, points.right);

    mGroup.add(leftBar, leftDiagonal, rightDiagonal, rightBar);
    return mGroup;
  };

  const m = createM();
  m.position.z = 0.15;
  m.scale.set(0.9, 0.9, 0.9);

  // Kết hợp tất cả các phần
  group.add(coin, ring, m);
  
  return group;
};

const init = () => {
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 3.5;

  // Renderer setup với độ sắc nét cao
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: 'highp'
  });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.value.appendChild(renderer.domElement);

  // Lighting với ánh sáng mạnh hơn để tăng độ tương phản
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(2, 2, 4);
  scene.add(directionalLight);

  // Thêm ánh sáng phụ để tạo highlights
  const additionalLight = new THREE.DirectionalLight(0xFF8C00, 0.3);
  additionalLight.position.set(-2, -2, 2);
  scene.add(additionalLight);

  // Create and add logo
  logo = createLogo();
  scene.add(logo);

  // Set static position optimized for menu
  logo.rotation.x = 0;
  logo.rotation.y = -0.2;
  logo.scale.set(1, 1, 1);

  // Render with high quality settings
  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  // Cleanup Three.js resources
  if (renderer) {
    renderer.dispose();
  }
  if (logo) {
    logo.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
});
</script>

<style scoped>
.logo-container {
  width: 48px;  /* Tăng từ 36px lên 48px */
  height: 48px;
  display: inline-block;
}
</style>