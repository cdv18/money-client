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
        <div class="avatar-wrapper" ref="avatarRef" @click="toggleMenu">
          <UserAvatar :size="32" />
          <div v-if="showMenu" class="avatar-menu">
            <div class="menu-items">
              <router-link to="/user" class="menu-item">
                <span class="material-icons">person</span>
                <span>Thông tin tài khoản</span>
              </router-link>
              <div class="menu-item">
                <span class="material-icons">help</span>
                <span>Trợ giúp</span>
              </div>
              <div class="menu-divider"></div>
              <div class="menu-item logout" @click="handleLogout">
                <span class="material-icons">logout</span>
                <span>Đăng xuất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import UserAvatar from './UserAvatar.vue';
import BaseButton from './BaseButton.vue';

const router = useRouter();
const showMenu = ref(false);
const avatarRef = ref(null);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleClickOutside = (event) => {
  if (avatarRef.value && !avatarRef.value.contains(event.target)) {
    showMenu.value = false;
  }
};

const handleLogout = () => {
  // TODO: Implement logout logic
  router.push('/login');
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const quickAdd = (type) => {
  router.push(`/${type}`);
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

.avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.avatar-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px; /* Tăng từ 200px lên 240px */
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px 0;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px; /* Tăng padding top/bottom từ 8px lên 10px */
  color: #1c1c1e;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap; /* Ngăn text wrap */
}

.menu-item:hover {
  background: var(--bg-light);
}

.menu-item .material-icons {
  font-size: 20px;
  color: #666;
}

.menu-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 4px 0;
}

.logout {
  color: #FF3B30;
}

.logout .material-icons {
  color: #FF3B30;
}
</style>
