<template>
  <div class="user-info-view">
    <div class="view-header">
      <h2>Thông Tin Người Dùng</h2>
    </div>

    <div class="info-container">
      <div class="avatar-section">
        <UserAvatar :size="120" />
        <h3 class="user-name">{{ userInfo.fullName }}</h3>
        <p class="user-email">{{ userInfo.email }}</p>
      </div>

      <div class="tabs-container">
        <div class="tab-buttons">
          <button 
            v-for="tab in tabs" 
            :key="tab.value"
            :class="['tab-button', { active: currentTab === tab.value }]"
            @click="currentTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Thông tin cá nhân -->
        <div v-if="currentTab === 'info'" class="tab-content">
          <div class="info-grid">
            <div class="info-item">
              <label>Họ và tên</label>
              <div class="value">{{ userInfo.fullName }}</div>
            </div>
            <div class="info-item">
              <label>Giới tính</label>
              <div class="value">{{ userInfo.gender === 'male' ? 'Nam' : 'Nữ' }}</div>
            </div>
            <div class="info-item">
              <label>Ngày sinh</label>
              <div class="value">{{ formatDate(userInfo.birthDate) }}</div>
            </div>
            <div class="info-item">
              <label>Quê quán</label>
              <div class="value">{{ userInfo.hometown }}</div>
            </div>
            <div class="info-item">
              <label>Email</label>
              <div class="value">{{ userInfo.email }}</div>
            </div>
            <div class="info-item">
              <label>Số điện thoại</label>
              <div class="value">{{ userInfo.phone }}</div>
            </div>
            <div class="info-item">
              <label>Tên đăng nhập</label>
              <div class="value">{{ userInfo.username }}</div>
            </div>
          </div>
          <BaseButton 
            variant="primary" 
            class="edit-button"
            @click="openEditDialog"
          >
            Chỉnh sửa thông tin
          </BaseButton>
        </div>

        <!-- Tab Bảo mật -->
        <div v-if="currentTab === 'security'" class="tab-content">
          <div class="security-section">
            <h3>Đổi mật khẩu</h3>
            <form @submit.prevent="changePassword" class="password-form">
              <div class="form-group">
                <label>Mật khẩu hiện tại</label>
                <BaseInput 
                  v-model="passwordForm.currentPassword" 
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div class="form-group">
                <label>Mật khẩu mới</label>
                <BaseInput 
                  v-model="passwordForm.newPassword" 
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div class="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <BaseInput 
                  v-model="passwordForm.confirmPassword" 
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <BaseButton variant="primary" type="submit">
                Cập nhật mật khẩu
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup chỉnh sửa thông tin -->
    <BasePopup
      v-model="showEditPopup"
      title="Chỉnh sửa thông tin"
      size="small"
    >
      <div class="form-group">
        <label>Họ và tên</label>
        <BaseInput v-model="editForm.fullName" placeholder="Nhập họ và tên" />
      </div>
      
      <div class="form-group">
        <label>Giới tính</label>
        <BaseCombobox
          v-model="editForm.gender"
          :options="genderOptions"
        />
      </div>

      <div class="form-group">
        <label>Ngày sinh</label>
        <BaseDatePicker v-model="editForm.birthDate" />
      </div>

      <div class="form-group">
        <label>Quê quán</label>
        <BaseInput v-model="editForm.hometown" placeholder="Nhập quê quán" />
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="showEditPopup = false">Hủy</BaseButton>
        <BaseButton variant="primary" @click="saveUserInfo">Lưu thay đổi</BaseButton>
      </template>
    </BasePopup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BasePopup from '../components/BasePopup.vue';
import BaseCombobox from '../components/BaseCombobox.vue';
import BaseDatePicker from '../components/BaseDatePicker.vue';
import UserAvatar from '../components/UserAvatar.vue';

const currentTab = ref('info');
const showEditPopup = ref(false);

const tabs = [
  { label: 'Thông tin cá nhân', value: 'info' },
  { label: 'Bảo mật', value: 'security' }
];

const genderOptions = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' }
];

// Mock data
const userInfo = ref({
  fullName: 'Nguyễn Văn A',
  gender: 'male',
  birthDate: new Date('1990-01-01'),
  hometown: 'Hà Nội',
  email: 'nguyenvana@example.com',
  phone: '0987654321',
  username: 'nguyenvana'
});

const editForm = ref({
  fullName: '',
  gender: '',
  birthDate: null,
  hometown: ''
});

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN').format(date);
};

const openEditDialog = () => {
  editForm.value = {
    fullName: userInfo.value.fullName,
    gender: userInfo.value.gender,
    birthDate: userInfo.value.birthDate,
    hometown: userInfo.value.hometown
  };
  showEditPopup.value = true;
};

const saveUserInfo = () => {
  userInfo.value = {
    ...userInfo.value,
    ...editForm.value
  };
  showEditPopup.value = false;
};

const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Mật khẩu xác nhận không khớp');
    return;
  }
  
  // TODO: Implement password change logic
  alert('Đổi mật khẩu thành công');
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};
</script>

<style scoped>
.user-info-view {
  width: 100%; /* Thay đổi max-width thành width */
  min-height: calc(100vh - 48px); /* Chiều cao trừ đi height của TopNav */
}

.info-container {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-top: 2rem;
  width: 100%; /* Đảm bảo container rộng 100% */
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-name {
  margin: 1rem 0 0.25rem;
  font-size: 1.5rem;
}

.user-email {
  color: #666;
  font-size: 0.875rem;
}

.tabs-container {
  padding: 1rem;
}

.tab-buttons {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 0.875rem;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tab-button.active {
  color: #007AFF;
  font-weight: 500;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #007AFF;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Tăng độ rộng tối thiểu của mỗi item */
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  font-size: 0.875rem;
  color: #666;
}

.info-item .value {
  font-weight: 500;
}

.edit-button {
  width: 100%;
  margin-top: 1rem;
}

.security-section {
  max-width: 600px; /* Tăng độ rộng tối đa */
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.tab-content {
  padding: 2rem; /* Tăng padding */
}

.view-header {
  padding-top: 0; /* Remove or reduce padding */
  margin: 0; /* Remove margin */
  align-items: center; /* Center align vertically */
}

h2 {
  padding: 0; /* Remove padding */
}
</style>
