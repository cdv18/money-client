<template>
  <BasePopup
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Xác nhận"
    size="small"
    :hideCloseButton="false"
    @close="cancel"
  >
    <div class="confirm-content">
      {{ message }}
    </div>
    <template #footer>
      <BaseButton variant="secondary" @click="cancel">Hủy</BaseButton>
      <BaseButton variant="danger" @click="confirm">Đồng ý</BaseButton>
    </template>
  </BasePopup>
</template>

<script>
import BasePopup from './BasePopup.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'BaseConfirm',
  components: { BasePopup, BaseButton },
  props: {
    modelValue: Boolean,
    message: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const confirm = () => {
      emit('confirm');
      emit('update:modelValue', false);
    };

    const cancel = () => {
      emit('cancel');
      emit('update:modelValue', false);
    };

    return { confirm, cancel };
  }
};
</script>

<style scoped>
.confirm-content {
  text-align: center;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #1c1c1e;
}
</style>
