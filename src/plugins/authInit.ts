import { useAuthStore } from '@/stores/authStore';

export default {
  install: () => {
    const authStore = useAuthStore();
    authStore.init(); // Inicializa al cargar la app
  }
};
