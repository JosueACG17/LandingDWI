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
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await genericRequest.post<{
        message: string;
        user: User;
      }>('/auth/login', { email, password });

      if (response.user) {
        user.value = response.user;
        this.setAuthCookie(response.user.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  async verifyToken(): Promise<boolean> {
    const token = this.getAuthCookie();
    if (!token) return false;

    try {
      const response = await genericRequest.post<{
        valid: boolean;
        user?: User;
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

  getCurrentUser(): User | null {
    return user.value;
  },

  logout(): void {
    user.value = null;
    this.removeAuthCookie();
  },

  // Helpers de cookies
  setAuthCookie(token: string): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 hora
    document.cookie = `jwt_token=${token}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
  },

  getAuthCookie(): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt_token='))
      ?.split('=')[1] || null;
  },

  removeAuthCookie(): void {
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};
