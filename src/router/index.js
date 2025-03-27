import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('../views/Dashboard.vue') },
  { path: '/income', component: () => import('../views/Income.vue') },
  { path: '/expense', component: () => import('../views/Expense.vue') },
  { path: '/categories', component: () => import('../views/Categories.vue') },
  { path: '/statistics', component: () => import('../views/Statistics.vue') },
  { path: '/history', component: () => import('../views/History.vue') },
  { path: '/user', component: () => import('../views/UserInfo.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/register', component: () => import('../views/Register.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
