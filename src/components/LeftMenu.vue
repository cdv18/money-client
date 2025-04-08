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
        <router-link :to="item.path" class="menu-link" :class="{ 'collapsed': isCollapsed }">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path :d="item.icon" />
          </svg>
          <span v-if="!isCollapsed">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mdiViewDashboard, mdiCashPlus, mdiCashMinus, mdiShape, mdiChartBar, mdiHistory, mdiAccount, mdiBankOutline } from '@mdi/js';

export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mdiViewDashboard,
      mdiCashPlus,
      mdiCashMinus,
      mdiShape,
      mdiChartBar,
      mdiHistory,
      mdiAccount,
      mdiBankOutline,
      menuItems: [
        { path: '/', icon: mdiViewDashboard, title: 'Dashboard' },
        { path: '/accounts', icon: mdiBankOutline, title: 'Tài Khoản' },
        { path: '/income', icon: mdiCashPlus, title: 'Ghi Thu' },
        { path: '/expense', icon: mdiCashMinus, title: 'Ghi Chi' },
        { path: '/categories', icon: mdiShape, title: 'Danh Mục' },
        { path: '/statistics', icon: mdiChartBar, title: 'Thống Kê' },
        { path: '/history', icon: mdiHistory, title: 'Lịch Sử' },
        { path: '/user', icon: mdiAccount, title: 'Thông Tin Người Dùng' }
      ]
    };
  }
};
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
    list-style: none; // Loại bỏ dấu chấm đầu dòng
    padding: 0.5rem; // Loại bỏ padding mặc định

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.25rem;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      a {
        color: rgba(0, 0, 0, 0.75) !important; // Đảm bảo màu đen được ưu tiên
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: var(--radius-sm);
        width: 100%;
        justify-content: center; /* Thêm justify-content */
        transition: all 0.2s ease;

        /* Thêm style cho trạng thái collapsed */
        :deep(.collapsed) {
          justify-content: center;
          padding: 10px 0;
        }

        span:not(.material-icons) {
          flex: 1;
        }

        svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0; /* Ngăn svg bị co lại */
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

        svg {
          width: 24px;
          height: 24px;
          color: inherit;
        }

        &.dashboard {
          color: #5856d6;
          &:hover { background-color: rgba(88, 86, 214, 0.1); }
        }
        
        &.income {
          color: #4cd964;
          &:hover { background-color: rgba(76, 217, 100, 0.1); }
        }
        
        &[href="/expense"] {
          color: #ff3b30;
          &:hover { background-color: rgba(255, 59, 48, 0.1); }
        }
        
        &[href="/categories"] {
          color: #ff9500;
          &:hover { background-color: rgba(255, 149, 0, 0.1); }
        }
        
        &[href="/statistics"] {
          color: #5ac8fa;
          &:hover { background-color: rgba(90, 200, 250, 0.1); }
        }
        
        &[href="/history"] {
          color: #007aff;
          &:hover { background-color: rgba(0, 122, 255, 0.1); }
        }
        
        &[href="/user"] {
          color: #af52de;
          &:hover { background-color: rgba(175, 82, 222, 0.1); }
        }

        &.router-link-active {
          background-color: rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }

        svg {
          transition: transform 0.2s ease;
        }

        &:hover svg {
          transform: scale(1.1);
        }
      }

      svg {
        width: 24px;
        height: 24px;
        opacity: 0.75;
        transition: opacity 0.2s ease;
      }

      &:hover svg {
        opacity: 0.9;
      }
    }
  }
}
</style>
