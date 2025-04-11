<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleNotifications">
      <span class="material-icons">notifications</span>
      <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
    </button>

    <div v-if="showNotifications" class="notification-menu">
      <div class="notification-header">
        <h3>Thông báo</h3>
        <button v-if="unreadCount > 0" class="mark-all-read" @click="markAllAsRead">
          Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div class="notification-list">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          :class="['notification-item', { unread: !notification.read }]"
          @click="markAsRead(notification)"
        >
          <div class="notification-icon">
            <span class="material-icons" :style="{ color: notification.iconColor }">
              {{ notification.icon }}
            </span>
          </div>
          <div class="notification-content">
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatTime(notification.time) }}</div>
          </div>
        </div>

        <div v-if="notifications.length === 0" class="empty-state">
          Không có thông báo nào
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const bellRef = ref(null);
const showNotifications = ref(false);

// Mock data - trong thực tế sẽ lấy từ API
const notifications = ref([
  {
    id: 1,
    message: 'Bạn vừa thêm một khoản chi mới',
    time: new Date('2025-04-10T10:30:00'),
    icon: 'remove_circle',
    iconColor: '#FF3B30',
    read: false
  },
  {
    id: 2,
    message: 'Đã thêm khoản thu thành công',
    time: new Date('2025-04-10T09:15:00'),
    icon: 'add_circle',
    iconColor: '#4CAF50',
    read: false
  },
  {
    id: 3,
    message: 'Chào mừng bạn đến với ứng dụng',
    time: new Date('2025-04-09T15:45:00'),
    icon: 'waving_hand',
    iconColor: '#007AFF',
    read: true
  }
]);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAsRead = (notification) => {
  notification.read = true;
};

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
};

const formatTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else {
    return `${days} ngày trước`;
  }
};

const handleClickOutside = (event) => {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    showNotifications.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.notification-bell {
  position: relative;
}

.bell-button {
  background: none;
  border: none;
  padding: 4px; /* Giảm padding */
  cursor: pointer;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 28px; /* Thêm width cố định */
  height: 28px; /* Thêm height cố định */
}

.bell-button:hover {
  background: var(--bg-light);
}

.notification-badge {
  position: absolute;
  top: -2px; /* Điều chỉnh vị trí */
  right: -2px;
  min-width: 16px; /* Giảm kích thước */
  height: 16px;
  background: #FF3B30;
  color: white;
  font-size: 11px; /* Giảm font size */
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.notification-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: -8px;
  width: 320px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.notification-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.mark-all-read {
  background: none;
  border: none;
  color: #007AFF;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
}

.mark-all-read:hover {
  background: rgba(0, 122, 255, 0.1);
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 12px 16px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.notification-item:hover {
  background: var(--bg-light);
}

.notification-item.unread {
  background: rgba(0, 122, 255, 0.05);
}

.notification-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-icon .material-icons {
  font-size: 20px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: #1c1c1e;
}

.notification-time {
  font-size: 0.75rem;
  color: #666;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
}
</style>