<template>
  <Transition name="fade">
    <div v-if="modelValue" class="popup-overlay" @click="handleOverlayClick">
      <div class="popup-container" :class="size" @click.stop>
        <div class="popup-header">
          <h3 class="popup-title">{{ title }}</h3>
          <button v-if="!hideCloseButton" class="close-button" @click="close">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="popup-content">
          <slot></slot>
        </div>
        
        <div v-if="$slots.footer" class="popup-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'BasePopup',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.close();
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modelValue) {
        this.close();
      }
    });
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-container {
  background: var(--surface-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.popup-container.small {
  max-width: 400px;
}

.popup-container.medium {
  max-width: 600px;
}

.popup-container.large {
  max-width: 800px;
}

.popup-header {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popup-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.popup-content {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.popup-footer {
  padding: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
