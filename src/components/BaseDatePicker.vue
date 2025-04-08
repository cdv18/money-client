<template>
  <div class="base-datepicker">
    <DatePicker
      v-model="date"
      :masks="masks"
      :attributes="attributes"
      :is-expanded="false"
      :locale="locale"
      :model-config="modelConfig"
      color="blue"
      :class="['vc-datepicker', { 'is-invalid': invalid }]"
      @update:modelValue="handleUpdate"
    >
      <template #default="{ inputValue, inputEvents }">
        <div class="date-input" :class="{ 'is-invalid': invalid }">
          <input
            :value="inputValue"
            v-on="inputEvents"
            :placeholder="placeholder"
            class="date-input-field"
          />
          <span class="material-icons">event</span>
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Chọn ngày'
  },
  invalid: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const date = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const locale = {
  lang: 'vi',
  masks: {
    input: 'DD/MM/YYYY'
  }
};

const masks = {
  input: 'DD/MM/YYYY'
};

const modelConfig = {
  type: 'date'
};

const attributes = [
  {
    key: 'today',
    dot: true,
    dates: new Date()
  }
];

const handleUpdate = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.base-datepicker {
  width: 100%;
}

.date-input {
  display: flex;
  align-items: center;
  background: var(--bg-light);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  padding: 0 12px;
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

.material-icons {
  color: #007AFF; /* Thay đổi màu từ #666 thành #007AFF */
  font-size: 20px;
}

.is-invalid {
  border-color: #dc3545;
}

:deep(.vc-container) {
  --vc-blue: #007AFF;
  border: none;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

:deep(.vc-blue) {
  --vc-accent-100: rgba(0, 122, 255, 0.1);
}
</style>
