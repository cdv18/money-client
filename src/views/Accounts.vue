<template>
  <div class="accounts-view">
    <div class="view-header">
      <div class="left-section">
        <h2>Tài Khoản</h2>
      </div>
      <BaseButton 
        variant="primary" 
        size="small" 
        iconBefore="add"
        @click="openAddDialog"
      >
        Thêm tài khoản
      </BaseButton>
    </div>

    <div class="accounts-container">
      <div class="accounts-list">
        <div v-for="account in accounts" :key="account.id" class="account-item">
          <div class="account-info">
            <span class="material-icons" :style="{ color: account.color }">
              {{ account.icon }}
            </span>
            <div class="account-details">
              <span class="account-name">{{ account.name }}</span>
              <span class="account-balance">{{ formatCurrency(account.balance) }}</span>
            </div>
          </div>
          <div class="account-actions">
            <button class="action-button" @click="editAccount(account)">
              <span class="material-icons">edit</span>
            </button>
            <button class="action-button" @click="deleteAccount(account)">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <BasePopup
      v-model="showPopup"
      :title="isEditing ? 'Sửa tài khoản' : 'Thêm tài khoản'"
      size="small"
    >
      <div class="form-group">
        <label>Tên tài khoản</label>
        <BaseInput v-model="editingAccount.name" placeholder="Nhập tên tài khoản" />
      </div>
      
      <div class="form-group">
        <label>Loại</label>
        <BaseCombobox
          v-model="editingAccount.type"
          :options="accountTypes"
        />
      </div>

      <div class="form-group">
        <label>Số dư ban đầu</label>
        <BaseInput v-model="editingAccount.balance" type="number" placeholder="0" />
      </div>

      <div class="form-group">
        <label>Ghi chú</label>
        <textarea 
          v-model="editingAccount.note" 
          class="account-note"
          placeholder="Thêm ghi chú (không bắt buộc)"
        ></textarea>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closePopup">Hủy</BaseButton>
        <BaseButton variant="primary" @click="saveAccount">Lưu</BaseButton>
      </template>
    </BasePopup>

    <BaseConfirm
      v-model="showConfirmDelete"
      :message="`Bạn có muốn xóa tài khoản ${deletingAccount?.name} không?`"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BasePopup from '../components/BasePopup.vue';
import BaseCombobox from '../components/BaseCombobox.vue';
import BaseConfirm from '../components/BaseConfirm.vue';
import { useConfirm } from '../composables/useConfirm';

// State
const accounts = ref([
  { 
    id: 1, 
    name: 'Ví tiền', 
    type: 'cash',
    balance: 1000000,
    icon: 'account_balance_wallet',
    color: '#4CAF50',
    note: 'Tiền mặt hằng ngày'
  },
  { 
    id: 2, 
    name: 'Techcombank', 
    type: 'bank',
    balance: 5000000,
    icon: 'account_balance',
    color: '#F44336',
    note: 'Tài khoản lương'
  }
]);

const showPopup = ref(false);
const isEditing = ref(false);
const editingAccount = ref({
  name: '',
  type: 'cash',
  balance: 0,
  icon: 'account_balance_wallet',
  color: '#4CAF50',
  note: ''
});

const accountTypes = [
  { 
    label: 'Tiền mặt',
    value: 'cash',
    icon: 'account_balance_wallet'
  },
  { 
    label: 'Tài khoản ngân hàng',
    value: 'bank',
    icon: 'account_balance'
  }
];

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(amount);
};

const openAddDialog = () => {
  isEditing.value = false;
  editingAccount.value = {
    name: '',
    type: 'cash',
    balance: 0,
    icon: 'account_balance_wallet',
    color: '#4CAF50',
    note: ''
  };
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
  editingAccount.value = {
    name: '',
    type: 'cash',
    balance: 0,
    icon: 'account_balance_wallet',
    color: '#4CAF50',
    note: ''
  };
};

const saveAccount = () => {
  if (!editingAccount.value.name) {
    alert('Vui lòng nhập tên tài khoản');
    return;
  }

  if (editingAccount.value.balance === '') {
    alert('Vui lòng nhập số dư ban đầu');
    return;
  }

  if (isEditing.value) {
    const index = accounts.value.findIndex(acc => acc.id === editingAccount.value.id);
    if (index !== -1) {
      accounts.value[index] = { ...editingAccount.value };
    }
  } else {
    accounts.value.push({
      id: Date.now(),
      icon: editingAccount.value.type === 'cash' ? 'account_balance_wallet' : 'account_balance',
      color: editingAccount.value.type === 'cash' ? '#4CAF50' : '#F44336',
      ...editingAccount.value
    });
  }
  
  closePopup();
};

const editAccount = (account) => {
  isEditing.value = true;
  editingAccount.value = { ...account };
  showPopup.value = true;
};

const { confirm } = useConfirm();

const deleteAccount = async (account) => {
  const confirmed = await confirm(
    'Xác nhận xóa',
    `Bạn có muốn xóa tài khoản ${account.name} không?`
  );
  
  if (confirmed) {
    accounts.value = accounts.value.filter(acc => acc.id !== account.id);
  }
};
</script>

<style scoped>
.view-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accounts-view {
  /* Similar to categories-view styles */
}

.account-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--surface-light);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.account-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.account-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.account-name {
  font-weight: 500;
}

.account-balance {
  color: #666;
  font-size: 0.875rem;
}

.account-type-select {
  width: 100%;
  padding: 8px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--bg-light);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.account-type-select:focus {
  border-color: #007AFF;
  background: white;
}

.account-note {
  width: 100%;
  min-height: 80px;
  max-height: 120px; /* Giới hạn chiều cao tối đa */
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
  resize: vertical;
  font-size: 14px;
  font-family: inherit;
  background: var(--bg-light);
  box-sizing: border-box; /* Đảm bảo padding không làm tăng width */
  overflow-x: hidden; /* Ngăn scroll ngang */
  line-height: 1.5;
}

.account-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: #666;
}

.action-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.action-button .material-icons {
  font-size: 18px; /* Giảm kích thước icon */
}

.form-group {
  margin-bottom: 16px;
  width: 100%; /* Đảm bảo form-group không bị tràn */
  box-sizing: border-box;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1c1c1e;
  font-size: 0.875rem;
}

.account-type-select {
  width: 100%;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: var(--bg-light);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  height: 36px;
}

.account-note {
  width: 100%;
  min-height: 80px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.1);
  resize: vertical;
  font-size: 14px;
  font-family: inherit;
  background: var(--bg-light);
}

.account-type-select:focus,
.account-note:focus {
  border-color: #007AFF;
  background: white;
}
</style>
