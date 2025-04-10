<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-message"
          :class="toast.type"
        >
          <span class="material-icons icon">
            {{ getIcon(toast.type) }}
          </span>
          <span class="message">{{ toast.message }}</span>
          <button class="close-button" @click="removeToast(toast.id)">
            <span class="material-icons">close</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '../composables/useToast';

const { toasts, removeToast } = useToast();

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return 'check_circle';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
  backdrop-filter: blur(8px);
}

.message {
  flex: 1;
  color: #1c1c1e;
  font-size: 14px;
  line-height: 1.4;
}

.close-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  color: #8e8e93;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 22px;
}

/* Toast types - Only change icon colors */
.success .icon {
  color: #34c759;
}

.error .icon {
  color: #ff3b30;
}

.warning .icon {
  color: #ff9500;
}

.info .icon {
  color: #007aff;
}

/* Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>