<template>
  <div class="ios-input-group">
    <!-- Icon trước -->
    <span v-if="iconBefore" class="material-icons icon">{{ iconBefore }}</span>
    
    <!-- Input -->
    <input
      :placeholder="placeholder"
      v-model="inputValue"
      class="input"
      @input="$emit('update:modelValue', inputValue)"
      @focus="$emit('focus', $event)"
      ref="input"
    />
    
    <!-- Icon xóa -->
    <span v-if="inputValue" class="material-icons icon clear-icon" @click="clearInput">close</span>
    
    <!-- Icon sau -->
    <span v-if="iconAfter" class="material-icons icon icon-after">{{ iconAfter }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    iconBefore: {
      type: String,
      default: '' // Tên icon trước (nếu không truyền thì không hiển thị)
    },
    iconAfter: {
      type: String,
      default: '' // Tên icon sau (nếu không truyền thì không hiển thị)
    },
    placeholder: {
      type: String,
      default: 'Nhập nội dung...' // Placeholder mặc định
    }
  },
  data() {
    return {
      inputValue: this.modelValue // Giá trị input
    };
  },
  methods: {
    clearInput() {
      this.inputValue = ''; // Xóa nội dung input
      this.$emit('update:modelValue', ''); // Cập nhật giá trị binding
    },
    focus() {
      this.$refs.input.focus();
    }
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue; // Đồng bộ giá trị từ bên ngoài
    }
  }
};
</script>

<style scoped>
.ios-input-group {
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  padding: 2px 12px; /* Thay đổi padding để icon gần input hơn */
  display: flex;
  align-items: center;
  gap: 8px; /* Giảm khoảng cách giữa icon và input */
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.ios-input-group:hover,
.ios-input-group:focus-within {
  border-color: #007AFF;
  background: white;
}

input {
  border: none;
  background: transparent;
  padding: 4px;
  height: 28px; /* Giảm chiều cao xuống */
  width: 100%;
  font-size: 14px;
  line-height: 1;
  
  &:focus {
    outline: none;
  }
}

/* Icon styles */
.material-icons {
  font-size: 18px; /* Giảm kích thước icon */
  color: #666;
  flex-shrink: 0; /* Ngăn icon bị co lại */
}
</style>
