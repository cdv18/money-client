<template>
  <div class="intro-page">
    <!-- Intro TopBar -->
    <div class="intro-topbar" :class="{ 'scrolled': isScrolled }">
      <div class="topbar-left">
        <router-link to="/intro" class="logo">
          Money App
        </router-link>
      </div>
      <div class="topbar-right">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/login" class="nav-link">Đăng nhập</router-link>
        <router-link to="/register" class="btn-register">Đăng ký</router-link>
      </div>
    </div>

    <!-- Hero Section with 3D Scene -->
    <div class="hero-section">
      <div class="hero-3d" style="height: 60vh;">
        <Scene3D ref="scene3D" @scene-ready="onSceneReady" />
      </div>
      <div class="hero-content">
        <h1>Quản lý chi tiêu</h1>
        <p>Giải pháp quản lý tài chính cá nhân thông minh</p>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="section-title">
        <h2>Tính năng nổi bật</h2>
        <p>Khám phá các công cụ mạnh mẽ giúp bạn quản lý tài chính hiệu quả</p>
      </div>

      <div v-for="(feature, index) in features" 
           :key="feature.id" 
           class="feature-item"
           :class="{ 'visible': isFeatureVisible[index] }"
           :ref="el => { if (el) featureElements[index] = el }"
      >
        <div class="feature-3d-container" style="height: 300px;">
          <Scene3D 
            ref="featureScenes"
            @scene-ready="() => onFeatureSceneReady(index)"
            class="feature-scene"
          />
        </div>
        <div class="feature-content">
          <h2>{{ feature.title }}</h2>
          <p class="feature-description">{{ feature.description }}</p>
          <ul class="feature-benefits">
            <li v-for="(benefit, idx) in feature.benefits" :key="idx">
              <span class="material-icons check-icon">check_circle</span>
              {{ benefit }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <div class="cta-content">
        <h2>Bắt đầu quản lý tài chính ngay hôm nay</h2>
        <p>Tạo tài khoản miễn phí và khám phá các tính năng tuyệt vời</p>
        <div class="cta-buttons">
          <router-link to="/register" class="btn-primary">Đăng ký ngay</router-link>
          <router-link to="/login" class="btn-secondary">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from './Scene3D.vue';

gsap.registerPlugin(ScrollTrigger);

const scene3D = ref(null);
const featureScenes = ref([]);
const featureElements = ref([]);
const isFeatureVisible = ref([]);
const isScrolled = ref(false);

const features = [
  {
    id: 1,
    title: 'Ghi chép thu chi thông minh',
    description: 'Quản lý mọi khoản thu chi của bạn một cách dễ dàng và chuyên nghiệp',
    benefits: [
      'Giao diện đơn giản, thân thiện với người dùng',
      'Tự động phân loại các khoản thu chi',
      'Nhập liệu nhanh chóng với các mẫu có sẵn',
      'Đồng bộ dữ liệu trên nhiều thiết bị'
    ],
    icon: 'wallet'
  },
  {
    id: 2,
    title: 'Phân loại chi tiêu khoa học',
    description: 'Tổ chức và theo dõi chi tiêu theo từng danh mục một cách khoa học',
    benefits: [
      'Danh mục thu chi được tùy chỉnh linh hoạt',
      'Phân tích chi tiêu theo từng danh mục',
      'Thiết lập hạn mức cho từng loại chi tiêu',
      'Cảnh báo khi vượt quá ngân sách'
    ],
    icon: 'categories'
  },
  {
    id: 3,
    title: 'Báo cáo và thống kê chi tiết',
    description: 'Theo dõi tình hình tài chính qua các báo cáo trực quan',
    benefits: [
      'Biểu đồ thống kê thu chi theo thời gian',
      'Phân tích xu hướng chi tiêu',
      'Báo cáo PDF chi tiết hàng tháng',
      'So sánh chi tiêu giữa các thời kỳ'
    ],
    icon: 'chart'
  },
  {
    id: 4,
    title: 'Quản lý đa tài khoản',
    description: 'Theo dõi số dư và quản lý nhiều tài khoản khác nhau',
    benefits: [
      'Quản lý không giới hạn số tài khoản',
      'Theo dõi số dư realtime',
      'Chuyển tiền giữa các tài khoản',
      'Lịch sử giao dịch chi tiết'
    ],
    icon: 'accounts'
  }
];

// Khởi tạo mảng isFeatureVisible
features.forEach(() => {
  isFeatureVisible.value.push(false);
});

// Tạo các đối tượng 3D cho từng feature
const createFeatureObject = (feature) => {
  let geometry, material, mesh;
  
  switch (feature.icon) {
    case 'wallet':
      geometry = new THREE.BoxGeometry(1.5, 1, 0.2);
      material = new THREE.MeshPhongMaterial({ color: 0x4A90E2 });
      break;
      
    case 'categories':
      geometry = new THREE.IcosahedronGeometry(1, 0);
      material = new THREE.MeshPhongMaterial({ color: 0xFF9500 });
      break;
      
    case 'chart':
      const group = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const barGeo = new THREE.BoxGeometry(0.3, 0.5 + i * 0.5, 0.3);
        const barMat = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.x = i * 0.5 - 0.5;
        bar.position.y = (0.5 + i * 0.5) / 2;
        group.add(bar);
      }
      return group;
      
    case 'accounts':
      geometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
      material = new THREE.MeshPhongMaterial({ 
        color: 0xFFD700,
        metalness: 0.7,
        roughness: 0.3
      });
      break;
  }
  
  if (geometry && material) {
    mesh = new THREE.Mesh(geometry, material);
  }
  
  return mesh || new THREE.Group();
};

// Thêm animation cho objects
const animateFeatureObject = (object) => {
  gsap.to(object.rotation, {
    y: Math.PI * 2,
    duration: 8,
    repeat: -1,
    ease: 'none'
  });

  gsap.to(object.position, {
    y: '+=0.2',
    duration: 1.5,
    yoyo: true,
    repeat: -1,
    ease: 'power1.inOut'
  });
};

// Setup scene cho từng feature
const onFeatureSceneReady = (index) => {
  if (!featureScenes.value[index]) return;
  
  const scene = featureScenes.value[index];
  
  // Thêm ánh sáng
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.addToScene(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.addToScene(directionalLight);

  // Tạo và thêm object
  const object = createFeatureObject(features[index]);
  scene.addToScene(object);
  
  // Camera position
  if (scene.camera) {
    scene.camera.position.set(0, 0, 4);
  }

  // Animation
  animateFeatureObject(object);
};

// Scroll animation
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  featureElements.value.forEach((element, index) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top center+=100',
      onEnter: () => {
        isFeatureVisible.value[index] = true;
      }
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

const handleScroll = () => {
  // Kiểm tra vị trí scroll, nếu scroll xuống quá hero section thì đổi màu
  isScrolled.value = window.scrollY > window.innerHeight - 64; // 64 là chiều cao của topbar
};

// Tạo các đối tượng 3D
const createCoin = () => {
  const group = new THREE.Group();

  // Tạo thân đồng xu với chi tiết cạnh
  const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 64, 4, true);
  const coinMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 0.8,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const coin = new THREE.Mesh(coinGeometry, coinMaterial);

  // Tạo hai mặt đồng xu
  const faceGeometry = new THREE.CircleGeometry(1, 64);
  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 0.8,
    roughness: 0.1
  });
  
  const frontFace = new THREE.Mesh(faceGeometry, faceMaterial);
  frontFace.position.y = 0.05;
  frontFace.rotation.x = -Math.PI / 2;

  const backFace = new THREE.Mesh(faceGeometry, faceMaterial);
  backFace.position.y = -0.05;
  backFace.rotation.x = Math.PI / 2;

  // Tạo chi tiết nổi trên mặt đồng xu
  const detailGeometry = new THREE.RingGeometry(0.6, 0.8, 32);
  const detailMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 0.9,
    roughness: 0.1
  });

  const frontDetail = new THREE.Mesh(detailGeometry, detailMaterial);
  frontDetail.position.y = 0.051;
  frontDetail.rotation.x = -Math.PI / 2;

  const backDetail = new THREE.Mesh(detailGeometry, detailMaterial);
  backDetail.position.y = -0.051;
  backDetail.rotation.x = Math.PI / 2;

  group.add(coin, frontFace, backFace, frontDetail, backDetail);
  return group;
};

const createWallet = () => {
  const group = new THREE.Group();

  // Tạo phần thân của ví
  const walletGeometry = new THREE.BoxGeometry(2, 1.2, 0.3);
  const walletMaterial = new THREE.MeshStandardMaterial({
    color: 0x4A4A4A,
    roughness: 0.8,
    metalness: 0.2
  });
  const wallet = new THREE.Mesh(walletGeometry, walletMaterial);

  // Tạo các đường viền của ví
  const edgeGeometry = new THREE.BoxGeometry(2.02, 1.22, 0.02);
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x2A2A2A,
    roughness: 0.5
  });
  
  const topEdge = new THREE.Mesh(edgeGeometry, edgeMaterial);
  topEdge.position.z = 0.16;

  const bottomEdge = new THREE.Mesh(edgeGeometry, edgeMaterial);
  bottomEdge.position.z = -0.16;

  // Tạo nắp ví
  const flapGeometry = new THREE.BoxGeometry(2, 0.4, 0.02);
  const flapMaterial = new THREE.MeshStandardMaterial({
    color: 0x4A4A4A,
    roughness: 0.7
  });
  const flap = new THREE.Mesh(flapGeometry, flapMaterial);
  flap.position.y = 0.7;
  flap.position.z = 0.15;

  // Tạo các chi tiết trang trí
  const detailGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.02);
  const detailMaterial = new THREE.MeshStandardMaterial({
    color: 0xC0C0C0,
    metalness: 0.8,
    roughness: 0.2
  });

  // Thêm các chi tiết kim loại
  for (let i = 0; i < 3; i++) {
    const detail = new THREE.Mesh(detailGeometry, detailMaterial);
    detail.position.set(-0.8 + i * 0.8, 0.5, 0.152);
    group.add(detail);
  }

  group.add(wallet, topEdge, bottomEdge, flap);
  return group;
};

const createChart = () => {
  const group = new THREE.Group();
  
  // Tạo đế biểu đồ
  const baseGeometry = new THREE.BoxGeometry(3, 0.1, 1);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0xE0E0E0,
    metalness: 0.1,
    roughness: 0.8
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -0.05;
  group.add(base);

  // Tạo các cột với hiệu ứng gradient
  const colors = [0x4CAF50, 0x2196F3, 0x9C27B0, 0xFF9800];
  const heights = [1.5, 2.2, 1.8, 2.5];

  for (let i = 0; i < 4; i++) {
    const height = heights[i];
    const barGeometry = new THREE.BoxGeometry(0.4, height, 0.4);
    
    // Tạo material với hiệu ứng gradient
    const barMaterial = new THREE.MeshStandardMaterial({
      color: colors[i],
      metalness: 0.3,
      roughness: 0.4
    });

    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.x = i * 0.7 - 1;
    bar.position.y = height / 2;

    // Thêm viền sáng trên đỉnh cột
    const topGeometry = new THREE.BoxGeometry(0.4, 0.05, 0.4);
    const topMaterial = new THREE.MeshStandardMaterial({
      color: colors[i],
      metalness: 0.8,
      roughness: 0.2
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = height;

    const barGroup = new THREE.Group();
    barGroup.add(bar, top);
    group.add(barGroup);
  }

  return group;
};

// Thêm ánh sáng
const setupLights = () => {
  // Ánh sáng môi trường
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene3D.value.addToScene(ambientLight);

  // Ánh sáng chính
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 5, 5);
  scene3D.value.addToScene(mainLight);

  // Ánh sáng phụ để tạo độ sâu
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 3, -5);
  scene3D.value.addToScene(fillLight);

  // Ánh sáng nhấn mạnh chi tiết
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
  rimLight.position.set(0, -5, 0);
  scene3D.value.addToScene(rimLight);
};

// Animation
const animateObjects = (objects) => {
  objects.forEach((obj, index) => {
    gsap.to(obj.rotation, {
      y: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: 'none',
      delay: index * 0.2
    });

    gsap.to(obj.position, {
      y: '+=0.5',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: index * 0.3
    });
  });
};

// Khởi tạo scene khi scene3D đã sẵn sàng
const onSceneReady = () => {
  if (!scene3D.value) return;

  // Thiết lập scene
  setupLights();

  // Tạo và thêm các đối tượng
  const coin = createCoin();
  coin.position.set(-3, 0, 0);
  
  const wallet = createWallet();
  wallet.position.set(0, 0, 0);
  
  const chart = createChart();
  chart.position.set(3, 0, 0);

  const objects = [coin, wallet, chart];
  objects.forEach(obj => scene3D.value.addToScene(obj));

  // Bắt đầu animation
  animateObjects(objects);

  // Điều chỉnh camera
  if (scene3D.value.camera) {
    scene3D.value.camera.position.set(0, 2, 8);
  }
};
</script>

<style scoped>
.intro-page {
  width: 100%;
  overflow-x: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
}

.hero-3d {
  position: relative;
  z-index: 1;
  pointer-events: none; /* Tắt sự kiện chuột trên scene 3D */
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
}

.features-section {
  background: white;
  padding: 6rem 2rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #1c1c1e;
  margin-bottom: 1rem;
}

.section-title p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 4rem 0;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.feature-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-item:nth-child(even) {
  flex-direction: row-reverse;
}

.feature-3d-container {
  flex: 1;
  position: relative;
  pointer-events: none; /* Tắt sự kiện chuột trên scene 3D */
}

.feature-content {
  flex: 1;
  padding: 2rem 4rem;
}

.feature-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1c1c1e;
}

.feature-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.feature-benefits {
  list-style: none;
  padding: 0;
}

.feature-benefits li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #1c1c1e;
}

.check-icon {
  color: #4CAF50;
  font-size: 1.25rem;
}

.cta-section {
  background: linear-gradient(135deg, #0d47a1 0%, #1a237e 100%);
  padding: 6rem 2rem;
  text-align: center;
  color: white;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: white;
  color: #1a237e;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.intro-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 2rem; /* Khoảng cách giữa các items */
}

.nav-link {
  padding: 8px 16px; /* Thêm padding cho các nav links */
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.intro-topbar.scrolled .nav-link:hover {
  color: #007AFF;
}

.btn-register {
  background: white;
  color: #1a237e;
  padding: 8px 24px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  margin-left: 1rem; /* Thêm margin bên trái để tách biệt với nav links */
}

/* Style cho trạng thái đã scroll */
.intro-topbar.scrolled {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.intro-topbar.scrolled .logo,
.intro-topbar.scrolled .nav-link {
  color: #1c1c1e;
}

.intro-topbar.scrolled .btn-register {
  background: #007AFF;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.intro-topbar.scrolled .nav-link:hover {
  color: #007AFF;
}

.btn-register:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .feature-item {
    flex-direction: column !important;
    text-align: center;
    padding: 2rem 0;
  }

  .feature-3d-container {
    height: 200px !important;
    margin-bottom: 2rem;
  }

  .feature-content {
    padding: 1rem;
  }

  .feature-benefits {
    text-align: left;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>