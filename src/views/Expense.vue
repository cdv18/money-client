<template>
  <div class="expense-view">
    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="expense-form">
        <div class="form-group">
          <label>Số tiền</label>
          <BaseInput 
            v-model="form.amount"
            :type="InputType.CURRENCY"
            placeholder="Nhập số tiền"
            iconBefore="payments"
          />
        </div>

        <div class="form-group">
          <label>Danh mục</label>
          <BaseCombobox
            v-model="form.categoryId"
            :options="categoryOptions"
          />
        </div>

        <div class="form-group">
          <label>Tài khoản</label>
          <BaseCombobox
            v-model="form.accountId"
            :options="accountOptions"
          />
        </div>

        <div class="form-group">
          <label>Ngày chi tiêu</label>
          <DatePicker
            v-model="form.date"
            :masks="{ input: 'DD/MM/YYYY' }"
            color="blue"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div class="date-input">
                <input
                  :value="inputValue"
                  v-on="inputEvents"
                  placeholder="Chọn ngày"
                  class="date-input-field"
                />
                <span class="material-icons">event</span>
              </div>
            </template>
          </DatePicker>
        </div>

        <div class="form-group">
          <label>Mô tả</label>
          <BaseInput
            v-model="form.description"
            placeholder="Nhập mô tả"
            iconBefore="description"
          />
        </div>

        <div class="form-actions">
          <BaseButton
            type="submit"
            variant="danger"
            class="submit-button"
          >
            Lưu
          </BaseButton>
        </div>
      </form>

      <div class="recent-transactions">
        <h3>Chi tiêu gần đây</h3>
        <div class="transactions-list">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="transaction-item"
          >
            <div class="transaction-icon">
              <span class="material-icons" :style="{ color: transaction.category.color }">
                {{ transaction.category.icon }}
              </span>
            </div>
            <div class="transaction-info">
              <div class="transaction-main">
                <span class="transaction-name">{{ transaction.description }}</span>
                <span class="transaction-amount">-{{ formatCurrency(transaction.amount) }}</span>
              </div>
              <div class="transaction-details">
                <span class="category-name">{{ transaction.category.name }}</span>
                <span class="dot-separator">•</span>
                <span class="date">{{ formatDate(transaction.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseCombobox from '../components/BaseCombobox.vue';
import { DatePicker } from 'v-calendar';
import { useToast } from '../composables/useToast';
import { InputType, formatCurrency } from '../enums/InputType';

const toast = useToast();

const form = ref({
  amount: '',
  categoryId: '',
  accountId: '',
  date: new Date(),
  description: ''
});

// Mock data cho categories chi tiêu
const categoryOptions = [
  { value: 1, label: 'Ăn uống', icon: 'restaurant', color: '#FF5722' },
  { value: 2, label: 'Di chuyển', icon: 'directions_car', color: '#607D8B' },
  { value: 3, label: 'Mua sắm', icon: 'shopping_cart', color: '#9C27B0' }
];

// Mock data cho accounts
const accountOptions = [
  { value: 1, label: 'Tiền mặt', icon: 'account_balance_wallet' },
  { value: 2, label: 'Techcombank', icon: 'account_balance' }
];

// Mock data cho giao dịch gần đây
const recentTransactions = ref([
  {
    id: 1,
    amount: 150000,
    description: 'Ăn trưa',
    date: '2024-03-25',
    category: {
      name: 'Ăn uống',
      icon: 'restaurant',
      color: '#FF5722'
    }
  },
  {
    id: 2,
    amount: 300000,
    description: 'Đổ xăng',
    date: '2024-03-24',
    category: {
      name: 'Di chuyển',
      icon: 'directions_car',
      color: '#607D8B'
    }
  }
]);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const handleSubmit = async () => {
  try {
    // Validate form
    if (!form.value.amount || !form.value.categoryId) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Add expense logic here
    await addExpense(form.value);
    
    toast.success('Thêm khoản chi thành công');
    resetForm();
  } catch (error) {
    toast.error('Có lỗi xảy ra khi thêm khoản chi');
  }
};

const resetForm = () => {
  form.value = {
    amount: '',
    categoryId: '',
    accountId: '',
    date: new Date(),
    description: ''
  };
};
</script>

<style scoped>
.expense-view {
  width: 100%;
}

.view-header {
  padding-top: 0; /* Remove or reduce padding */
}

h2 {
  padding: 0; /* Remove padding */
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 0; /* Bỏ margin-top vì đã có padding từ content-wrapper */
}

.expense-form {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1c1c1e;
}

.form-actions {
  margin-top: 1.5rem;
}

.submit-button {
  width: auto;
  min-width: 120px;
  height: 36px;
  float: right;
}

.date-input {
  display: flex;
  align-items: center;
  background: var(--bg-light);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 0 12px;
  transition: all 0.2s;
}

.date-input:hover,
.date-input:focus-within {
  background: white;
  border-color: rgba(0, 0, 0, 0.1);
}

.date-input-field {
  border: none;
  background: transparent;
  padding: 8px 0;
  width: 100%;
  font-size: 14px;
  outline: none;
}

.date-input .material-icons {
  color: #007AFF;
}

.recent-transactions {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.recent-transactions h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #1c1c1e;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-light);
  margin-bottom: 0.5rem;
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-info {
  flex: 1;
}

.transaction-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.transaction-name {
  font-weight: 500;
}

.transaction-amount {
  color: #FF5722;
  font-weight: 600;
}

.transaction-details {
  font-size: 0.75rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot-separator {
  color: #999;
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
}

.view-header {
  margin: 0; /* Remove margin */
  align-items: center; /* Center align vertically */
}
</style>
