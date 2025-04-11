<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <ToastMessage />
</template>

<script setup>
import ToastMessage from './components/ToastMessage.vue';
</script>

<style>
/* Add global styles here */
</style>
