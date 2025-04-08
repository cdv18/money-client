import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('../views/Dashboard.vue') },
      { path: 'income', component: () => import('../views/Income.vue') },
      { path: 'expense', component: () => import('../views/Expense.vue') },
      { path: 'categories', component: () => import('../views/Categories.vue') },
      { path: 'statistics', component: () => import('../views/Statistics.vue') },
      { path: 'history', component: () => import('../views/History.vue') },
      { path: 'user', component: () => import('../views/UserInfo.vue') },
      { path: 'accounts', component: () => import('../views/Accounts.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard - tạm thời vô hiệu hóa
router.beforeEach((to, from, next) => {
  // const isAuthenticated = !!localStorage.getItem('token');
  
  // if (to.meta.requiresAuth && !isAuthenticated) {
  //   next('/login');
  // } else if (!to.meta.requiresAuth && isAuthenticated) {
  //   next('/');
  // } else {
  //   next();
  // }

  // Tạm thời cho phép truy cập tất cả các route
  next();
});

export default router;
