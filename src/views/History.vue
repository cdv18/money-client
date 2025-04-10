<template>
  <div class="history-view">
    <div class="view-header">
      <div class="header-left">
        <h2>Lịch Sử Giao Dịch</h2>
      </div>
      <div class="header-right">
        <!-- Thay thế BaseDateRangePicker bằng DatePicker trực tiếp -->
        <div class="date-filter">
          <DatePicker
            v-model="dateRange"
            is-range
            color="blue"
            :masks="{ input: 'DD/MM/YYYY' }"
            :model-config="{ type: 'date' }"
            class="date-range-picker"
          >
            <template v-slot="{ inputValue, inputEvents }">
              <div class="date-input">
                <input
                  :value="inputValue?.start"
                  v-on="inputEvents?.start || {}"
                  placeholder="Từ ngày"
                  class="date-input-field"
                />
                <span class="separator">-</span>
                <input
                  :value="inputValue?.end"
                  v-on="inputEvents?.end || {}"
                  placeholder="Đến ngày"
                  class="date-input-field"
                />
                <span class="material-icons">date_range</span>
              </div>
            </template>
          </DatePicker>
          <BaseButton 
            v-if="dateRange.start && dateRange.end"
            variant="ghost" 
            size="small"
            @click="clearDateRange"
          >
            <span class="material-icons">close</span>
          </BaseButton>
        </div>
        <div class="filter-group">
          <BaseButton 
            :variant="filter === 'all' ? 'primary' : 'ghost'" 
            size="small"
            @click="filter = 'all'"
            class="filter-button first"
          >
            Tất cả
          </BaseButton>
          <BaseButton 
            :variant="filter === 'income' ? 'primary' : 'ghost'" 
            size="small"
            @click="filter = 'income'"
            class="filter-button"
          >
            Thu
          </BaseButton>
          <BaseButton 
            :variant="filter === 'expense' ? 'primary' : 'ghost'" 
            size="small"
            @click="filter = 'expense'"
            class="filter-button last"
          >
            Chi
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="transactions-list">
      <div v-for="(group, date) in groupedTransactions" :key="date" class="date-group">
        <div class="date-header">
          <h3>{{ formatDate(date) }}</h3>
          <span class="daily-total" :class="getDailyBalanceClass(group.total)">
            {{ formatCurrency(group.total) }}
          </span>
        </div>

        <div class="transaction-items">
          <div v-for="transaction in group.items" 
               :key="transaction.id" 
               class="transaction-item"
               :class="transaction.type">
            <div class="transaction-icon">
              <span class="material-icons" :style="{ color: transaction.category.color }">
                {{ transaction.category.icon }}
              </span>
            </div>

            <div class="transaction-info">
              <div class="transaction-main">
                <div class="transaction-name-wrapper">
                  <span class="transaction-type" :class="transaction.type">
                    {{ transaction.type === 'income' ? 'Thu' : 'Chi' }}
                  </span>
                  <span class="transaction-name">{{ transaction.description }}</span>
                </div>
                <span class="transaction-amount" :class="transaction.type">
                  {{ transaction.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                </span>
              </div>
              <div class="transaction-details">
                <span class="category-name">{{ transaction.category.name }}</span>
                <span class="dot-separator">•</span>
                <span class="account-name">{{ transaction.account.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { DatePicker } from 'v-calendar';

const transactions = ref([
  {
    id: 1,
    type: 'income',
    description: 'Lương tháng 2',
    amount: 15000000,
    date: '2024-02-25',
    category: {
      name: 'Lương',
      icon: 'payments',
      color: '#4CAF50'
    },
    account: {
      name: 'Techcombank',
      type: 'bank'
    }
  },
  {
    id: 2,
    type: 'expense',
    description: 'Ăn trưa',
    amount: 50000,
    date: '2024-02-25',
    category: {
      name: 'Ăn uống',
      icon: 'restaurant',
      color: '#FF5722'
    },
    account: {
      name: 'Ví tiền',
      type: 'cash'
    }
  },
  // Thêm các giao dịch khác...
]);

const filter = ref('all'); // Thêm filter state

// Sửa cấu trúc của dateRange
const dateRange = ref({
  start: null,
  end: null,
  masks: {
    input: 'DD/MM/YYYY'
  }
}); 

// Cập nhật groupedTransactions để áp dụng filter
const groupedTransactions = computed(() => {
  const groups = {};
  
  const filteredTransactions = transactions.value.filter(trans => {
    // Filter by type
    if (filter.value !== 'all' && trans.type !== filter.value) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.value.start && dateRange.value.end) {
      const transDate = new Date(trans.date);
      return transDate >= dateRange.value.start && transDate <= dateRange.value.end;
    }
    
    return true;
  });
  
  filteredTransactions.forEach(trans => {
    if (!groups[trans.date]) {
      groups[trans.date] = {
        items: [],
        total: 0
      };
    }
    
    groups[trans.date].items.push(trans);
    groups[trans.date].total += trans.type === 'income' ? trans.amount : -trans.amount;
  });

  return Object.fromEntries(
    Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]))
  );
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const getDailyBalanceClass = (amount) => {
  return amount >= 0 ? 'positive' : 'negative';
};

// Thêm method để clear date range
const clearDateRange = () => {
  dateRange.value = {
    start: null,
    end: null
  };
};

</script>

<style scoped>
.history-view {  
  width: 100%;
}

.transactions-list {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.date-group {
  margin-bottom: 2rem;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.date-header h3 {
  font-size: 0.875rem;
  color: #666;
  font-weight: 600;
  text-transform: capitalize;
}

.daily-total {
  font-size: 0.875rem;
  font-weight: 600;
}

.daily-total.positive {
  color: #4CAF50;
}

.daily-total.negative {
  color: #FF5722;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Khôi phục về viền mặc định */
}

/* Xóa bỏ các style viền màu cho income/expense */
.transaction-item.income,
.transaction-item.expense {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--bg-light);
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

.transaction-name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.transaction-type {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.transaction-type.income {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.transaction-type.expense {
  background: rgba(255, 87, 34, 0.1);
  color: #FF5722;
}

.transaction-name {
  font-weight: 500;
}

.transaction-amount {
  font-weight: 600;
}

.transaction-amount.income {
  color: #4CAF50;
}

.transaction-amount.expense {
  color: #FF5722;
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

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 0; /* Remove or reduce padding */
  margin: 0; /* Remove margin */
  align-items: center; /* Center align vertically */
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-group {
  display: flex;
  background: white; /* Đổi màu nền thành trắng để tạo độ tương phản */
  padding: 2px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm); /* Thêm shadow nhẹ */
  border: 1px solid rgba(0, 0, 0, 0.05); /* Thêm viền mỏng */
}

.filter-button {
  border-radius: 0;
  min-width: 80px;
  height: 32px; /* Giảm chiều cao button */
  font-size: 0.875rem; /* Giảm kích thước chữ */
}

.filter-button.first {
  border-top-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}

.filter-button.last {
  border-top-right-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-sm);
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-range-picker {
  width: 240px;
}

.date-input {
  display: flex;
  align-items: center;
  background: var(--surface-light); /* Đổi màu nền nhạt hơn */
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-width: 300px; /* Tăng độ rộng của date picker */
  border-radius: var(--radius-sm);
  padding: 0 12px;
  gap: 8px;
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
  width: 120px;
  font-size: 14px;
  outline: none;
}

.separator {
  color: #666;
}

.material-icons {
  color: #007AFF; /* Thay đổi màu icon lịch từ #666 thành xanh dương */
}

:deep(.vc-container) {
  --vc-blue: #007AFF;
  border: none;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

:deep(.vc-pane-container) {
  width: 100%; /* Fix lỗi layout của v-calendar */
}

:deep(.vc-wrapper) {
  width: 100%;
  min-width: auto;
}

h2 {
  padding: 0; /* Remove padding */
}
</style>
