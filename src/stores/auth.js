import { defineStore } from 'pinia';
import { authAPI } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await authAPI.login(credentials);
        this.token = response.token;
        this.user = response.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.token);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});
