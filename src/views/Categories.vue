<template>
  <div class="categories-view">
    <div class="header">
      <h2>Danh Mục</h2>
      <BaseButton 
        variant="primary" 
        size="small" 
        iconBefore="add"
        @click="openAddDialog"
      >
        Thêm danh mục
      </BaseButton>
    </div>

    <div class="tab-container">
      <div class="tab-header">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          :class="['tab-button', { active: currentTab === tab.value }]"
          @click="currentTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <div class="categories-list">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id" 
            class="category-item"
          >
            <div class="category-info">
              <span class="material-icons" :style="{ color: category.color }">
                {{ category.icon }}
              </span>
              <span class="category-name">{{ category.name }}</span>
            </div>
            <div class="category-actions">
              <button class="action-button" @click="editCategory(category)">
                <span class="material-icons">edit</span>
              </button>
              <button class="action-button" @click="deleteCategory(category)">
                <span class="material-icons">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup thêm/sửa danh mục -->
    <BasePopup
      v-model="showPopup"
      :title="popupTitle"
      size="small"
    >
      <div class="form-group">
        <label>Tên danh mục</label>
        <BaseInput v-model="editingCategory.name" placeholder="Nhập tên danh mục" />
      </div>
      <div class="form-group">
        <label>Icon</label>
        <BaseInput v-model="editingCategory.icon" placeholder="Chọn icon" />
      </div>
      <div class="form-group">
        <label>Màu sắc</label>
        <input type="color" v-model="editingCategory.color" />
      </div>
      <template #footer>
        <BaseButton variant="secondary" @click="showPopup = false">Hủy</BaseButton>
        <BaseButton variant="primary" @click="saveCategory">Lưu</BaseButton>
      </template>
    </BasePopup>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BasePopup from '../components/BasePopup.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    BasePopup
  },
  setup() {
    const currentTab = ref('income');
    const showPopup = ref(false);
    const isEditing = ref(false);
    const editingCategory = ref({
      name: '',
      icon: '',
      color: '#000000',
      type: 'income'
    });

    const tabs = [
      { label: 'Danh mục thu', value: 'income' },
      { label: 'Danh mục chi', value: 'expense' }
    ];

    // Giả lập dữ liệu
    const categories = ref([
      { id: 1, name: 'Lương', icon: 'payments', color: '#4CAF50', type: 'income' },
      { id: 2, name: 'Thưởng', icon: 'card_giftcard', color: '#2196F3', type: 'income' },
      { id: 3, name: 'Ăn uống', icon: 'restaurant', color: '#FF5722', type: 'expense' },
      { id: 4, name: 'Di chuyển', icon: 'directions_car', color: '#607D8B', type: 'expense' }
    ]);

    const filteredCategories = computed(() => {
      return categories.value.filter(cat => cat.type === currentTab.value);
    });

    const openAddDialog = () => {
      isEditing.value = false;
      editingCategory.value = {
        name: '',
        icon: '',
        color: '#000000',
        type: currentTab.value
      };
      showPopup.value = true;
    };

    // ...remaining methods

    return {
      currentTab,
      tabs,
      categories,
      filteredCategories,
      showPopup,
      editingCategory,
      openAddDialog
    };
  }
};
</script>

<style scoped>
.categories-view {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tab-container {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.tab-header {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.tab-button {
  flex: 1;
  padding: 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.tab-button.active {
  color: #007AFF;
  border-bottom: 2px solid #007AFF;
}

.categories-list {
  padding: 16px;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 8px;
  background: var(--bg-light);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-actions {
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

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
</style>
