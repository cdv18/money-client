<template>
  <div class="nav-container">
    <div class="left-section">
      <BaseButton 
        variant="ghost" 
        iconBefore="menu"
        size="medium"
        @click="$emit('toggle-menu')" 
      />
      <h2 class="page-title">{{ currentPageTitle }}</h2>
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

      <NotificationBell />

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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import UserAvatar from './UserAvatar.vue';
import BaseButton from './BaseButton.vue';
import NotificationBell from './NotificationBell.vue';

const router = useRouter();
const route = useRoute();
const showMenu = ref(false);
const avatarRef = ref(null);

const currentPageTitle = computed(() => {
  switch (route.path) {
    case '/':
      return 'Dashboard';
    case '/accounts':
      return 'Tài Khoản';
    case '/income':
      return 'Ghi Thu';
    case '/expense':
      return 'Ghi Chi';
    case '/categories':
      return 'Danh Mục';
    case '/statistics':
      return 'Thống Kê';
    case '/history':
      return 'Lịch Sử Giao Dịch';
    case '/user':
      return 'Thông Tin Người Dùng';
    default:
      return '';
  }
});

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
  padding: 0 12px; /* Giảm padding container */
  box-sizing: border-box;
  width: 100%;
}

.menu-button {
  width: 32px; /* Giảm kích thước */
  height: 32px;
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
  gap: 0.5rem; /* Giảm khoảng cách từ 0.75rem xuống 0.5rem */
  padding-right: 0.75rem;
  flex: 1;
  min-width: 0;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 8px; /* Giảm khoảng cách */
}

.quick-actions {
  display: flex;
  gap: 4px; /* Giảm khoảng cách giữa các nút */
  padding: 2px; /* Giảm padding */
  background: rgba(0, 0, 0, 0.03);
  border-radius: var(--radius-md);
}

.quick-add-btn {
  font-size: 0.8125rem; /* Giảm font size */
  font-weight: 500;
  padding: 0 8px; /* Giảm padding */
  height: 28px; /* Thêm chiều cao cố định nhỏ hơn */
  min-width: 0; /* Cho phép nút co lại */
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
  min-width: 240px;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Tăng z-index lên cao hơn */
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

.page-title {
  margin: 0;
  font-size: 1rem; /* Giảm font size từ 1.125rem xuống 1rem */
  font-weight: 500;
  color: #1c1c1e;
  user-select: none;
  white-space: nowrap; /* Ngăn title xuống dòng */
  overflow: hidden;
  text-overflow: ellipsis; /* Hiển thị ... khi title quá dài */
}
</style>
