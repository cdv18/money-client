<template>
  <div class="ios-input-group" :class="{ 'is-invalid': invalid }">
    <span v-if="iconBefore" class="material-icons icon">{{ iconBefore }}</span>
    
    <input
      ref="input"
      :value="displayValue"
      :type="inputType"
      :placeholder="placeholder"
      @input="handleInput"
      @blur="handleBlur"
      @focus="$emit('focus', $event)"
    />
    
    <span v-if="showClearButton" class="material-icons icon clear-icon" @click="clearInput">close</span>
    <span v-if="iconAfter" class="material-icons icon icon-after">{{ iconAfter }}</span>
  </div>
</template>

<script>
import { InputType, formatCurrency, parseCurrency } from '../enums/InputType';

export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: InputType.TEXT,
      validator: (value) => Object.values(InputType).includes(value)
    },
    iconBefore: {
      type: String,
      default: ''
    },
    iconAfter: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Nhập nội dung...'
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      localValue: this.modelValue
    };
  },

  computed: {
    inputType() {
      return this.type === InputType.CURRENCY ? 'text' : this.type;
    },

    displayValue() {
      if (this.type === InputType.CURRENCY) {
        return formatCurrency(this.localValue);
      }
      return this.localValue;
    },

    showClearButton() {
      return this.localValue && this.type !== InputType.PASSWORD;
    }
  },

  methods: {
    handleInput(event) {
      let value = event.target.value;
      
      if (this.type === InputType.CURRENCY) {
        this.localValue = parseCurrency(value);
        this.$emit('update:modelValue', this.localValue);
      } else {
        this.localValue = value;
        this.$emit('update:modelValue', value);
      }
    },

    handleBlur(event) {
      this.$emit('blur', event);
    },

    clearInput() {
      this.localValue = '';
      this.$emit('update:modelValue', '');
      this.$refs.input.focus();
    },

    focus() {
      this.$refs.input.focus();
    }
  },

  watch: {
    modelValue(newValue) {
      this.localValue = newValue;
    }
  }
};
</script>

<style scoped>
.ios-input-group {
  background: var(--bg-light);
  border-radius: var(--radius-sm);
  padding: 2px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.ios-input-group:hover,
.ios-input-group:focus-within {
  border-color: #007AFF;
  background: white;
}

.ios-input-group.is-invalid {
  border-color: #ff3b30;
}

input {
  border: none;
  background: transparent;
  padding: 4px;
  height: 28px;
  width: 100%;
  font-size: 14px;
  line-height: 1;
  
  &:focus {
    outline: none;
  }
}

.material-icons {
  font-size: 18px;
  color: #666;
  flex-shrink: 0;
}

.clear-icon {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
}
</style>
