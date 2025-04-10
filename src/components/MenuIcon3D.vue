<template>
  <div class="menu-icon-3d" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#000000'
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const container = ref(null);
let scene, camera, renderer, object;
let animationFrameId;

// Create different 3D objects based on icon type
const createIcon = (type) => {
  const result = getIconGeometry(type);
  
  // Create standard material
  const createMaterial = () => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(props.color),
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 0
    });
  };
  
  // If result is already a Group, handle each child
  if (result instanceof THREE.Group) {
    result.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        child.material = createMaterial();
      }
    });
    return result;
  }
  
  // Otherwise create a mesh with the geometry
  return new THREE.Mesh(result, createMaterial());
};

const getIconGeometry = (type) => {
  const scale = 1.5;
  
  switch (type) {
    case 'accounts':
      // Tạo nhóm ví tiền và thẻ ngân hàng
      const walletGroup = new THREE.Group();
      
      // Ví tiền
      const walletBody = new THREE.BoxGeometry(0.8 * scale, 0.6 * scale, 0.1 * scale);
      const wallet = new THREE.Mesh(walletBody);
      wallet.position.set(-0.2 * scale, 0, 0);
      
      // Thẻ ngân hàng
      const cardGeometry = new THREE.BoxGeometry(0.6 * scale, 0.4 * scale, 0.02 * scale);
      const card = new THREE.Mesh(cardGeometry);
      card.position.set(0.2 * scale, 0.1 * scale, 0.05 * scale);
      card.rotation.z = -0.2;
      
      walletGroup.add(wallet, card);
      return walletGroup;

    case 'income':
      // Tạo nhóm quyển sổ và mũi tên lên
      const incomeGroup = new THREE.Group();
      
      // Quyển sổ
      const bookCover = new THREE.BoxGeometry(0.8 * scale, 1 * scale, 0.1 * scale);
      const book = new THREE.Mesh(bookCover);
      // Trang sổ
      const page = new THREE.BoxGeometry(0.7 * scale, 0.9 * scale, 0.02 * scale);
      const pageMesh = new THREE.Mesh(page);
      pageMesh.position.z = 0.06 * scale;
      
      // Mũi tên lên
      const arrowUp = new THREE.ConeGeometry(0.15 * scale, 0.3 * scale, 32);
      const arrowUpMesh = new THREE.Mesh(arrowUp);
      arrowUpMesh.position.set(0.3 * scale, 0.2 * scale, 0.15 * scale);
      
      // Thân mũi tên
      const arrowBody = new THREE.BoxGeometry(0.05 * scale, 0.2 * scale, 0.05 * scale);
      const arrowBodyMesh = new THREE.Mesh(arrowBody);
      arrowBodyMesh.position.set(0.3 * scale, 0 * scale, 0.15 * scale);
      
      incomeGroup.add(book, pageMesh, arrowUpMesh, arrowBodyMesh);
      return incomeGroup;

    case 'expense':
      // Tạo nhóm quyển sổ và mũi tên xuống
      const expenseGroup = new THREE.Group();
      
      // Quyển sổ (giống income)
      const expBookCover = new THREE.BoxGeometry(0.8 * scale, 1 * scale, 0.1 * scale);
      const expBook = new THREE.Mesh(expBookCover);
      const expPage = new THREE.BoxGeometry(0.7 * scale, 0.9 * scale, 0.02 * scale);
      const expPageMesh = new THREE.Mesh(expPage);
      expPageMesh.position.z = 0.06 * scale;
      
      // Mũi tên xuống
      const arrowDown = new THREE.ConeGeometry(0.15 * scale, 0.3 * scale, 32);
      const arrowDownMesh = new THREE.Mesh(arrowDown);
      arrowDownMesh.position.set(0.3 * scale, -0.2 * scale, 0.15 * scale);
      arrowDownMesh.rotation.x = Math.PI;
      
      // Thân mũi tên
      const expArrowBody = new THREE.BoxGeometry(0.05 * scale, 0.2 * scale, 0.05 * scale);
      const expArrowBodyMesh = new THREE.Mesh(expArrowBody);
      expArrowBodyMesh.position.set(0.3 * scale, 0 * scale, 0.15 * scale);
      
      expenseGroup.add(expBook, expPageMesh, arrowDownMesh, expArrowBodyMesh);
      return expenseGroup;

    case 'history':
      // Tạo đồng hồ chi tiết
      const clockGroup = new THREE.Group();
      
      // Mặt đồng hồ
      const clockFace = new THREE.CylinderGeometry(0.5 * scale, 0.5 * scale, 0.05 * scale, 32);
      const clockFaceMesh = new THREE.Mesh(clockFace);
      
      // Viền đồng hồ
      const clockRim = new THREE.TorusGeometry(0.5 * scale, 0.03 * scale, 16, 32);
      const clockRimMesh = new THREE.Mesh(clockRim);
      clockRimMesh.rotation.x = Math.PI / 2;
      
      // Kim giờ
      const hourHand = new THREE.BoxGeometry(0.04 * scale, 0.25 * scale, 0.03 * scale);
      const hourHandMesh = new THREE.Mesh(hourHand);
      hourHandMesh.position.z = 0.05 * scale;
      hourHandMesh.rotation.z = Math.PI / 6;
      
      // Kim phút
      const minuteHand = new THREE.BoxGeometry(0.04 * scale, 0.35 * scale, 0.03 * scale);
      const minuteHandMesh = new THREE.Mesh(minuteHand);
      minuteHandMesh.position.z = 0.05 * scale;
      minuteHandMesh.rotation.z = Math.PI / 2;
      
      // Điểm trung tâm
      const center = new THREE.SphereGeometry(0.05 * scale, 32, 32);
      const centerMesh = new THREE.Mesh(center);
      centerMesh.position.z = 0.05 * scale;
      
      clockGroup.add(clockFaceMesh, clockRimMesh, hourHandMesh, minuteHandMesh, centerMesh);
      return clockGroup;

    case 'dashboard':
      const dashboardGroup = new THREE.Group();
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const box = new THREE.BoxGeometry(0.4 * scale, 0.4 * scale, 0.1 * scale);
          const mesh = new THREE.Mesh(box, new THREE.MeshPhongMaterial());
          mesh.position.set((i - 0.5) * 0.5 * scale, (j - 0.5) * 0.5 * scale, 0);
          dashboardGroup.add(mesh);
        }
      }
      return dashboardGroup;

    case 'categories':
      const categoryGroup = new THREE.Group();
      const circle = new THREE.CylinderGeometry(0.2 * scale, 0.2 * scale, 0.05 * scale, 32);
      const circleMesh = new THREE.Mesh(circle);
      circleMesh.position.set(-0.25 * scale, 0.25 * scale, 0);
      const square = new THREE.BoxGeometry(0.3 * scale, 0.3 * scale, 0.05 * scale);
      const squareMesh = new THREE.Mesh(square);
      squareMesh.position.set(0.25 * scale, 0.25 * scale, 0);
      const triangle = new THREE.ConeGeometry(0.2 * scale, 0.3 * scale, 3);
      const triangleMesh = new THREE.Mesh(triangle);
      triangleMesh.position.set(0, -0.25 * scale, 0);
      categoryGroup.add(circleMesh, squareMesh, triangleMesh);
      return categoryGroup;

    case 'statistics':
      const statsGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const height = (0.3 + i * 0.2) * scale;
        const bar = new THREE.BoxGeometry(0.2 * scale, height, 0.2 * scale);
        const barMesh = new THREE.Mesh(bar);
        barMesh.position.set((i - 1) * 0.3 * scale, height/2, 0);
        statsGroup.add(barMesh);
      }
      return statsGroup;

    case 'user':
      const userGroup = new THREE.Group();
      const head = new THREE.SphereGeometry(0.2 * scale, 32, 32);
      const headMesh = new THREE.Mesh(head);
      headMesh.position.y = 0.3 * scale;
      const body = new THREE.CylinderGeometry(0.2 * scale, 0.3 * scale, 0.4 * scale, 32);
      const bodyMesh = new THREE.Mesh(body);
      userGroup.add(headMesh, bodyMesh);
      return userGroup;

    default:
      return new THREE.BoxGeometry(0.8 * scale, 0.8 * scale, 0.1 * scale);
  }
};

const init = () => {
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    50,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 1.8; // Điều chỉnh gần hơn một chút

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 2);
  scene.add(directionalLight);

  // Create and add icon
  object = createIcon(props.icon);
  // Điều chỉnh góc nhìn để icon hiển thị tốt hơn
  object.rotation.set(0.3, 0.6, 0);
  scene.add(object);

  // Render một lần duy nhất
  renderer.render(scene, camera);
};

// Update color handling for both Mesh and Group
watch(() => props.isActive, (newValue) => {
  if (!object) return;
  
  const updateMaterial = (material) => {
    if (material && material instanceof THREE.Material) {
      const color = new THREE.Color(props.color);
      material.color.copy(color);
      material.emissive.copy(newValue ? color : new THREE.Color(0x000000));
      material.emissiveIntensity = newValue ? 0.2 : 0;
    }
  };

  if (object instanceof THREE.Group) {
    object.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.material) {
        updateMaterial(child.material);
      }
    });
  } else if (object instanceof THREE.Mesh && object.material) {
    updateMaterial(object.material);
  }
});

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  if (renderer) {
    renderer.dispose();
  }
  if (object) {
    if (object instanceof THREE.Group) {
      object.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    } else {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    }
  }
});
</script>

<style scoped>
.menu-icon-3d {
  width: 32px; /* Tăng từ 24px lên 32px */
  height: 32px; /* Tăng từ 24px lên 32px */
  position: relative;
}
</style>