<template>
  <router-view v-slot="{ Component }">
    <component 
      :is="Component" 
      v-if="route.meta.requiresAuth === false"
    />
    <MainLayout v-else>
      <component :is="Component" />
    </MainLayout>
  </router-view>
  <ToastMessage />
</template>

<script setup>
import { useRoute } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import ToastMessage from './components/ToastMessage.vue';

const route = useRoute();
</script>

<style>
/* Add global styles here */
</style>
