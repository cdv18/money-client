<template>
  <div class="base-daterange-picker">
    <DatePicker
      v-model="dateRange"
      :masks="masks"
      :attributes="attributes"
      :model-config="modelConfig"
      is-range
      color="blue"
      @update:modelValue="handleUpdate"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div class="daterange-input">
          <input
            :value="inputValue?.start"
            v-on="inputEvents?.start || {}"
            :placeholder="placeholder"
            class="date-input-field"
          />
          <span class="separator">-</span>
          <input
            :value="inputValue?.end"
            v-on="inputEvents?.end || {}"
            :placeholder="placeholder"
            class="date-input-field"
          />
          <span class="material-icons">date_range</span>
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: null, end: null })
  },
  placeholder: {
    type: String,
    default: 'Chọn ngày'
  }
});

const emit = defineEmits(['update:modelValue']);

const dateRange = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const masks = {
  input: 'DD/MM/YYYY'
};

const modelConfig = {
  type: 'date',
  mask: 'DD/MM/YYYY'
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
.base-daterange-picker {
  width: 100%;
}

.daterange-input {
  display: flex;
  align-items: center;
  background: var(--bg-light);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  padding: 0 12px;
  gap: 8px;
}

.daterange-input:hover,
.daterange-input:focus-within {
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

.separator {
  color: #666;
  padding: 0 4px;
}

.material-icons {
  color: #007AFF; /* Thay đổi màu từ #666 thành #007AFF */
  font-size: 20px;
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

:deep(.vc-header) {
  padding: 10px 0;
}

:deep(.vc-weeks) {
  padding: 0 10px;
}
</style>
