<template>
  <div
    class="user-avatar"
    :style="{
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      border: showBorder ? '1px solid rgba(0,0,0,0.1)' : 'none',
      background: 'var(--bg-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }"
  >
    <span v-if="!url" class="material-icons" :style="{ fontSize: size/2 + 'px' }">
      account_circle
    </span>
    <img v-else :src="url" :alt="alt" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 32
  },
  url: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'User avatar'
  },
  showBorder: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.user-avatar {
  display: inline-block;
}
</style>
