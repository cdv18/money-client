<template>
  <button
    :class="[
      'base-button',
      variant,
      size,
      { 'has-icon': iconBefore || iconAfter }
    ]"
    v-on="$listeners"
  >
    <span v-if="iconBefore" class="material-icons icon-before">{{ iconBefore }}</span>
    <span class="button-content"><slot></slot></span>
    <span v-if="iconAfter" class="material-icons icon-after">{{ iconAfter }}</span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    iconBefore: {
      type: String,
      default: ''
    },
    iconAfter: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log('Button listeners:', this.$listeners);
  }
};
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 16px;
  background: none;
}

.base-button:active {
  transform: scale(0.98);
}

/* Variants */
.primary {
  background: #007AFF;
  color: white;
}

.secondary {
  background: var(--bg-light);
  color: #007AFF;
}

.danger {
  background: #FF3B30;
  color: white;
}

.ghost {
  background: transparent;
  color: #007AFF;
}

/* Sizes */
.small {
  height: 28px; /* Giảm từ 32px xuống 28px */
  font-size: 0.8125rem; /* Giảm font size */
}

.medium {
  height: 36px;
  font-size: 0.875rem;
}

.large {
  height: 44px;
  font-size: 1rem;
}

/* Icons */
.has-icon {
  padding: 0 12px;
}

.icon-before, .icon-after {
  font-size: 20px;
}
</style>
