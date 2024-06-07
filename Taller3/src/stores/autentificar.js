// autentificar.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') || null,
  }),
  actions: {
    login(username) {
      this.user = username;
      localStorage.setItem('user', username);
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
