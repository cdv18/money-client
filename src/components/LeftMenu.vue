<template>
  <div
    :class="[
      'left-menu transition-all',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <div class="logo" :class="{ 'p-4': !isCollapsed, 'p-2': isCollapsed }">
      <span v-if="!isCollapsed" class="ml-2 text-lg font-semibold">Money</span>
    </div>
    <ul class="menu">
      <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <router-link :to="item.path" class="menu-link" :class="{ 'collapsed': isCollapsed }" v-slot="{ isActive }">
          <MenuIcon3D
            :icon="item.iconType"
            :color="item.color"
            :isActive="isActive"
          />
          <span v-if="!isCollapsed">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import MenuIcon3D from './MenuIcon3D.vue';

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
    iconType: 'accounts', 
    title: 'Tài Khoản',
    color: '#ff9500'
  },
  { 
    path: '/income', 
    iconType: 'income', 
    title: 'Ghi Thu',
    color: '#4cd964'
  },
  { 
    path: '/expense', 
    iconType: 'expense', 
    title: 'Ghi Chi',
    color: '#ff3b30'
  },
  { 
    path: '/categories', 
    iconType: 'categories', 
    title: 'Danh Mục',
    color: '#ff9500'
  },
  { 
    path: '/statistics', 
    iconType: 'statistics', 
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
    iconType: 'user', 
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

  .logo {
    padding: 1rem;
    display: flex;
    align-items: center;

    .text-lg {
      font-weight: bold;
    }
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

        &.router-link-active {
          background-color: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.9) !important;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
