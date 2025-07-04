import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(authService.getCurrentUser());
  const isAuthenticated = ref(!!user.value);

  const init = async () => {
    isAuthenticated.value = await authService.verifyToken();
    user.value = authService.getCurrentUser();
  };

  const login = async (email: string, password: string) => {
    const success = await authService.login(email, password);
    if (success) await init();
    return success;
  };

  const logout = () => {
    authService.logout();
    user.value = null;
    isAuthenticated.value = false;
  };

  return { user, isAuthenticated, init, login, logout };
});
