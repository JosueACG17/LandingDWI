import { onMounted, onUnmounted } from 'vue'
import { authService } from '@/services/auth'

export function useAuthValidation() {
  let intervalId: number | null = null

  const startValidation = () => {
    intervalId = setInterval(async () => {
      await authService.verifyToken()
    }, 5 * 60 * 1000) as unknown as number
  }

  const stopValidation = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(() => {
    startValidation()
  })

  onUnmounted(() => {
    stopValidation()
  })

  return {
    startValidation,
    stopValidation
  }
}
