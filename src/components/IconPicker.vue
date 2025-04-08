<template>
  <div class="icon-picker" ref="pickerContainer">
    <div class="input-wrapper" ref="inputWrapper">
      <BaseInput
        v-model="searchQuery"
        :placeholder="'Tìm icon...'" 
        @input="filterIcons"
        @focus="handleFocus"
      >
        <template v-if="modelValue">
          <span class="material-icons selected-icon">{{ modelValue }}</span>
        </template>
      </BaseInput>
    </div>

    <!-- Move to body using Teleport -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showPopover" class="icon-popover" ref="popover">
          <div class="icons-grid">
            <button
              v-for="icon in filteredIcons"
              :key="icon"
              class="icon-item"
              @click="selectIcon(icon)"
            >
              <span class="material-icons">{{ icon }}</span>
              <span class="icon-name">{{ icon }}</span>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import BaseInput from './BaseInput.vue';

// Danh sách icon phổ biến từ Material Icons
const commonIcons = [
  'home', 'settings', 'person', 'notifications', 'favorite',
  'shopping_cart', 'dashboard', 'payment', 'account_balance',
  'savings', 'receipt', 'restaurant', 'directions_car',
  'flight', 'hotel', 'shopping_bag', 'school', 'work',
  'fitness_center', 'sports_esports', 'local_cafe', 'local_grocery_store',
  'attach_money', 'account_balance_wallet', 'credit_card'
];

export default {
  components: {
    BaseInput
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const pickerContainer = ref(null);
    const inputWrapper = ref(null);
    const popover = ref(null);
    const showPopover = ref(false);
    const searchQuery = ref('');
    const filteredIcons = ref(commonIcons);

    const filterIcons = () => {
      if (!searchQuery.value) {
        filteredIcons.value = commonIcons;
        return;
      }
      filteredIcons.value = commonIcons.filter(icon => 
        icon.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    const selectIcon = (icon) => {
      emit('update:modelValue', icon);
      showPopover.value = false;
      searchQuery.value = '';
    };

    const hidePopover = () => {
      showPopover.value = false;
      searchQuery.value = '';
      filterIcons();
    };

    const handleFocus = () => {
      showPopover.value = true;
      nextTick(() => {
        if (!inputWrapper.value || !popover.value) return;
        
        const rect = inputWrapper.value.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        
        popover.value.style.width = `${rect.width}px`;
        popover.value.style.left = `${rect.left}px`;
        
        if (spaceBelow >= 300) {
          popover.value.style.top = `${rect.bottom + 4}px`;
          popover.value.style.bottom = 'auto';
        } else {
          popover.value.style.bottom = `${window.innerHeight - rect.top + 4}px`;
          popover.value.style.top = 'auto';
        }
      });
    };

    const handleClickOutside = (event) => {
      // Kiểm tra xem click có phải là vào input hoặc popover không
      const isInputClick = inputWrapper.value?.contains(event.target);
      const isPopoverClick = popover.value?.contains(event.target);
      
      if (!isInputClick && !isPopoverClick) {
        hidePopover();
      }
    };

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });

    return {
      pickerContainer,
      inputWrapper,
      popover,
      showPopover,
      searchQuery,
      filteredIcons,
      filterIcons,
      selectIcon,
      hidePopover,
      handleFocus
    };
  }
};
</script>

<style scoped>
.icon-picker {
  position: relative;
  width: 100%;
}

.input-wrapper {
  position: relative;
}

.selected-icon {
  margin-right: 8px;
}

.icon-popover {
  position: fixed;
  z-index: 1000; /* Cao hơn popup container */
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  animation: popoverFadeIn 0.2s ease;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-item:hover {
  background: var(--bg-light);
}

.icon-name {
  font-size: 10px;
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
