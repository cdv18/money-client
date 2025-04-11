<template>
  <div class="main-layout">
    <LeftMenu :is-collapsed="isCollapsed" />
    <div class="main-content">
      <TopNav @toggle-menu="handleToggle" />  <!-- Thêm hàm debug -->
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu.vue';
import TopNav from './TopNav.vue';

export default {
  components: {
    LeftMenu,
    TopNav
  },
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    handleToggle() {
      console.log('Toggle event received in MainLayout'); // Thêm log để debug
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem; /* Tăng padding từ 1rem lên 1.5rem */
  padding-top: 1rem; /* Giữ khoảng cách trên nhỏ hơn để gần với TopNav */
  background-color: #f7f7f7;
}
</style>
