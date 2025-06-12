<template>
  <div
    :class="[
      'left-menu transition-all',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="logo-section">
      <Logo3D />
      <span v-if="!isCollapsed" class="app-name">Money App</span>
    </div>
    <ul class="menu">
      <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <router-link :to="item.path" class="menu-link" :class="{ 'collapsed': isCollapsed }" v-slot="{ isExactActive }">
          <span class="material-icons" :style="{ color: isExactActive ? item.color : '#666' }">
            {{ item.iconType }}
          </span>
          <span v-if="!isCollapsed">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Logo3D from './Logo3D.vue';

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
});

const menuItems = [
  { 
    path: '/', 
    iconType: 'dashboard', 
    title: 'Dashboard',
    color: '#5856d6'
  },
  { 
    path: '/accounts', 
    iconType: 'account_balance_wallet', 
    title: 'Tài Khoản',
    color: '#ff9500'
  },
  { 
    path: '/income', 
    iconType: 'add_circle', 
    title: 'Ghi Thu',
    color: '#4cd964'
  },
  { 
    path: '/expense', 
    iconType: 'remove_circle', 
    title: 'Ghi Chi',
    color: '#ff3b30'
  },
  { 
    path: '/categories', 
    iconType: 'category', 
    title: 'Danh Mục',
    color: '#ff9500'
  },
  { 
    path: '/statistics', 
    iconType: 'bar_chart', 
    title: 'Thống Kê',
    color: '#5ac8fa'
  },
  { 
    path: '/history', 
    iconType: 'history', 
    title: 'Lịch Sử',
    color: '#007aff'
  },
  { 
    path: '/user', 
    iconType: 'person', 
    title: 'Thông Tin Người Dùng',
    color: '#af52de'
  }
];
</script>

<style lang="scss" scoped>
.left-menu {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  color: #1c1c1e;

  .logo-section {
    height: 64px; /* Tăng từ 48px lên 64px để chứa logo lớn hơn */
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .app-name {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(45deg, #00E5FF, #40C4FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }

  .menu {
    list-style: none;
    padding: 0.5rem;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.25rem;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      .menu-link {
        color: rgba(0, 0, 0, 0.75) !important;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: var(--radius-sm);
        width: 100%;
        transition: all 0.2s ease;

        &.collapsed {
          justify-content: center;
          padding: 10px 0;
        }

        span:not(.material-icons) {
          flex: 1;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.9) !important;
        }

        &.router-link-exact-active {
          background-color: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.9) !important;
          font-weight: 500;
        }
      }
    }
  }

  &.collapsed {
    width: 64px;
  }

  &.collapsed .app-name {
    display: none;
  }
}
</style>
