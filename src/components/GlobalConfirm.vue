<template>
  <Teleport to="body">
    <Transition name="fade">
      <BasePopup
        v-if="isShow"
        :title="title"
        size="small"
        :modelValue="true"
        :hideCloseButton="false"
        @close="handleCancel"
      >
        <div class="confirm-content">
          {{ message }}
        </div>
        <template #footer>
          <BaseButton variant="secondary" @click="handleCancel">Hủy</BaseButton>
          <BaseButton variant="primary" @click="handleConfirm">Đồng ý</BaseButton>
        </template>
      </BasePopup>
    </Transition>
  </Teleport>
</template>

<script>
import { ref } from 'vue';
import BasePopup from './BasePopup.vue';
import BaseButton from './BaseButton.vue';

export default {
  name: 'GlobalConfirm',
  components: { BasePopup, BaseButton },
  setup() {
    const isShow = ref(false);
    const title = ref('');
    const message = ref('');
    let resolvePromise = null;

    const show = (titleText, messageText) => {
      title.value = titleText;
      message.value = messageText;
      isShow.value = true;
      
      return new Promise(resolve => {
        resolvePromise = resolve;
      });
    };

    const handleConfirm = () => {
      isShow.value = false;
      resolvePromise?.(true);
    };

    const handleCancel = () => {
      isShow.value = false;
      resolvePromise?.(false);
    };

    return {
      isShow,
      title,
      message,
      handleConfirm,
      handleCancel,
      show
    };
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
