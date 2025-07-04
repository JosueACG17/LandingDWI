import { genericRequest } from '@/api/GenericRequest';
import { ref } from 'vue';

interface User {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  token: string;
  expiresAt: string;
}

const user = ref<User | null>(null);

export const authService = {
  // Login
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await genericRequest.post<{
        message: string;
        user: User;
      }>('/auth/login', { email, password });

      if (response.user) {
        user.value = response.user;
        this.setAuthCookie(response.user.token);
        return response.user;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  // Verificar token
  async verifyToken(): Promise<boolean> {
    const token = this.getAuthCookie();
    if (!token) return false;

    try {
      const response = await genericRequest.post<{
        valid: boolean;
        user: User;
      }>('/auth/verify-token', { token });

      if (response.valid && response.user) {
        user.value = response.user;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return user.value;
  },

  // Cerrar sesión
  logout(): void {
    user.value = null;
    this.removeAuthCookie();
  },

  // Manejo de cookies
  setAuthCookie(token: string): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 hora
    document.cookie = `jwt_token=${token}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  },

  getAuthCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'jwt_token') {
        return value;
      }
    }
    return null;
  },

  removeAuthCookie(): void {
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
};
