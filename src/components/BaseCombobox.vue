<template>
  <div class="base-combobox" ref="comboboxContainer">
    <div 
      class="combobox-input" 
      :class="{ 'is-open': isOpen }"
      @click="toggleDropdown"
    >
      <span class="selected-text">{{ selectedText }}</span>
      <span class="material-icons toggle-icon">
        {{ isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
      </span>
    </div>

    <Transition name="fade">
      <div v-if="isOpen" class="dropdown-container">
        <div class="dropdown-list">
          <div
            v-for="option in options"
            :key="option.value"
            class="dropdown-item"
            :class="{ 'selected': option.value === modelValue }"
            @click="selectOption(option)"
          >
            <span v-if="option.icon" class="material-icons item-icon">{{ option.icon }}</span>
            {{ option.label }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'BaseCombobox',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      required: true,
      // [{label: string, value: string, icon?: string}]
    },
    placeholder: {
      type: String,
      default: 'Chọn một giá trị'
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const comboboxContainer = ref(null);

    const selectedText = computed(() => {
      const selected = props.options.find(opt => opt.value === props.modelValue);
      return selected ? selected.label : props.placeholder;
    });

    const selectOption = (option) => {
      emit('update:modelValue', option.value);
      isOpen.value = false;
    };

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const handleClickOutside = (event) => {
      if (comboboxContainer.value && !comboboxContainer.value.contains(event.target)) {
        isOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isOpen,
      selectedText,
      comboboxContainer,
      selectOption,
      toggleDropdown
    };
  }
};
</script>

<style scoped>
.base-combobox {
  position: relative;
  width: 100%;
}

.combobox-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-light);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
}

.combobox-input:hover {
  background: white;
  border-color: rgba(0, 0, 0, 0.1);
}

.combobox-input.is-open {
  background: white;
  border-color: #007AFF;
}

.selected-text {
  font-size: 14px;
  color: #1c1c1e;
}

.toggle-icon {
  font-size: 20px;
  color: #666;
  transition: transform 0.2s ease;
}

.dropdown-container {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-list {
  padding: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-size: 14px;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: var(--bg-light);
}

.dropdown-item.selected {
  background: rgba(0, 122, 255, 0.1);
  color: #007AFF;
}

.item-icon {
  font-size: 18px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
