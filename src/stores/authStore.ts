import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth'

interface User {
  id: number
  nombre: string
  email: string
  telefono?: string
  token: string
  expiresAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const init = async () => {
    const tokenValid = await authService.verifyToken()
    isAuthenticated.value = tokenValid
    if (tokenValid) {
      user.value = authService.getCurrentUser()
    }
  }

  const login = async (email: string, password: string) => {
    const loggedInUser = await authService.login(email, password)
    if (loggedInUser) {
      user.value = loggedInUser
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    authService.logout()
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    init,
    login,
    logout
  }
})
