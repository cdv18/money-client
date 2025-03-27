<template>
  <div class="nav-container">
    <div class="left-section">
      <BaseButton 
        variant="ghost" 
        iconBefore="menu"
        size="medium"
        @click="$emit('toggle-menu')" 
      />
    </div>

    <div class="right-section">
      <div class="quick-actions">
        <BaseButton 
          variant="primary" 
          iconBefore="add_circle"
          class="quick-add-btn"
          size="small"
          @click="quickAdd('income')"
        >
          Thu
        </BaseButton>

        <BaseButton 
          variant="danger" 
          iconBefore="remove_circle"
          class="quick-add-btn"
          size="small"
          @click="quickAdd('expense')"
        >
          Chi
        </BaseButton>
      </div>

      <div class="avatar-container">
        <UserAvatar :size="32" />
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from './UserAvatar.vue';
import BaseButton from './BaseButton.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    UserAvatar,
    BaseButton
  },
  setup() {
    const router = useRouter();
    
    const quickAdd = (type) => {
      router.push(`/${type}`);
    };

    return { quickAdd };
  }
};
</script>

<style scoped>
.nav-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  width: 100%;
}

.menu-button {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--bg-light);
  }
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quick-actions {
  display: flex;
  gap: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: var(--radius-md);
}

.quick-add-btn {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0 12px;
}

.add-income {
  color: #4CAF50 !important;
}

.add-expense {
  color: #F44336 !important;
}

.avatar-container {
  display: flex;
  align-items: center;
  margin-right: -8px;
}
</style>
