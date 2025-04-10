<template>
  <div class="scene-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const emit = defineEmits(['scene-ready']);
const container = ref(null);
let camera, scene, renderer, controls;
let animationFrameId;

const init = () => {
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.value.appendChild(renderer.domElement);

  // Controls setup
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Emit scene-ready event
  emit('scene-ready');
};

const onWindowResize = () => {
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

// Expose methods for parent components
const addToScene = (object) => {
  scene.add(object);
};

const removeFromScene = (object) => {
  scene.remove(object);
};

onMounted(() => {
  init();
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onWindowResize);
  
  // Cleanup Three.js resources
  scene.traverse((object) => {
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
  
  renderer.dispose();
});

// Expose methods
defineExpose({
  addToScene,
  removeFromScene,
  scene,
  camera
});
</script>

<style scoped>
.scene-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>