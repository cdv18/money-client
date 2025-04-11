import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import IntroScene from '../components/IntroScene.vue';

const routes = [
  {
    path: '/intro',
    component: IntroScene,
    meta: { requiresAuth: false }
  },
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
    children: [
      { 
        path: '', 
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'income', 
        component: () => import('../views/Income.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'expense', 
        component: () => import('../views/Expense.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'categories', 
        component: () => import('../views/Categories.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'statistics', 
        component: () => import('../views/Statistics.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'history', 
        component: () => import('../views/History.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'accounts', 
        component: () => import('../views/Accounts.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'user', 
        component: () => import('../views/UserInfo.vue'),
        meta: { requiresAuth: true }
      }
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
