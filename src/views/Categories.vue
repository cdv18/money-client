<template>
  <div class="categories-view">
    <div class="view-header">
      <div class="left-section">
        <h2>Danh Mục</h2>
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
      </div>
      <BaseButton 
        variant="primary" 
        size="small" 
        iconBefore="add"
        @click="openAddDialog"
      >
        Thêm danh mục
      </BaseButton>
    </div>

    <div class="content-container">
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

    <BasePopup
      v-model="showPopup"
      :title="isEditing ? 'Sửa danh mục' : 'Thêm danh mục'"
      size="small"
    >
      <div class="form-group">
        <label>Tên danh mục</label>
        <BaseInput v-model="editingCategory.name" placeholder="Nhập tên danh mục" />
      </div>
      
      <div class="form-group">
        <label>Icon</label>
        <IconPicker v-model="editingCategory.icon" ref="iconPicker" />
      </div>

      <div class="form-group color-preview-group">
        <div class="color-section">
          <label>Màu sắc</label>
          <input type="color" v-model="editingCategory.color" class="color-picker" />
        </div>
        <div class="preview-section">
          <label>Xem trước</label>
          <div class="preview-icon" :style="{ color: editingCategory.color }">
            <span v-if="editingCategory.icon" class="material-icons">{{ editingCategory.icon }}</span>
            <span v-else class="placeholder">Chọn icon</span>
          </div>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="closePopup">Hủy</BaseButton>
        <BaseButton variant="primary" @click="saveCategory">Lưu</BaseButton>
      </template>
    </BasePopup>

    <BaseConfirm
      v-model="showConfirmDelete"
      :message="`Bạn có muốn xóa danh mục ${deletingCategory?.name} không?`"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BasePopup from '../components/BasePopup.vue';
import IconPicker from '../components/IconPicker.vue';
import BaseConfirm from '../components/BaseConfirm.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    BasePopup,
    IconPicker,
    BaseConfirm
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

    const iconPicker = ref(null);

    const closePopup = () => {
      showPopup.value = false;
      editingCategory.value = {
        name: '',
        icon: '',
        color: '#000000',
        type: currentTab.value
      };
    };

    const saveCategory = () => {
      // Thêm validation
      if (!editingCategory.value.name || !editingCategory.value.icon) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }

      if (isEditing.value) {
        // Logic sửa danh mục
      } else {
        // Logic thêm danh mục mới
        categories.value.push({
          id: Date.now(), // Tạm thời dùng timestamp làm id
          ...editingCategory.value
        });
      }
      closePopup();
    };

    const showConfirmDelete = ref(false);
    const deletingCategory = ref(null);

    const deleteCategory = (category) => {
      deletingCategory.value = category;
      showConfirmDelete.value = true;
    };

    const confirmDelete = () => {
      if (deletingCategory.value) {
        categories.value = categories.value.filter(
          cat => cat.id !== deletingCategory.value.id
        );
        deletingCategory.value = null;
      }
    };

    return {
      currentTab,
      tabs,
      categories,
      filteredCategories,
      showPopup,
      editingCategory,
      openAddDialog,
      closePopup,
      saveCategory,
      iconPicker,
      showConfirmDelete,
      deletingCategory,
      deleteCategory,
      confirmDelete
    };
  }
};
</script>

<style scoped>
.categories-view {
  /* Loại bỏ padding */
}

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

.tab-header {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 0.5rem;
}

.tab-button {
  padding: 0.5rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  position: relative;
}

.tab-button.active {
  color: #007AFF;
  font-weight: 600;
}

/* Thêm gạch chân cho tab active */
.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 100%;
  height: 2px;
  background: #007AFF;
  border-radius: 2px;
}

.content-container {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.categories-list {
  padding: 1rem;
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

.color-picker {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: var(--radius-sm);
}

.icon-color-group {
  display: flex;
  gap: 1rem;
}

.icon-preview, .color-preview {
  flex: 1;
}

.color-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-picker {
  width: 100px;
  height: 36px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.preview-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-icon .material-icons {
  font-size: 20px;
}

.color-preview-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
}

.color-section, .preview-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-icon {
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-icon .material-icons {
  font-size: 20px;
}

.preview-icon .placeholder {
  color: #666;
  font-size: 14px;
}
</style>
