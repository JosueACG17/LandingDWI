<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Shield } from 'lucide-vue-next'

const showPassword = ref(false)
const isLoading = ref(false)
const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  // Reset errors
  errors.email = ''
  errors.password = ''

  // Validate
  if (!formData.email) {
    errors.email = 'El email es requerido'
    return
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Ingresa un email válido'
    return
  }

  if (!formData.password) {
    errors.password = 'La contraseña es requerida'
    return
  }

  if (formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  isLoading.value = true

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false
    alert('¡Login exitoso! 🎉')
  }, 2000)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
    </div>

    <!-- Main container -->
    <div class="relative w-full max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-8 items-center">

        <!-- Left side - Branding -->
        <div class="hidden lg:block space-y-8">
          <div class="space-y-6">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
                <Sparkles class="w-6 h-6 text-white" />
              </div>
              <h1 class="text-3xl font-bold text-white">LeadFlowCRM</h1>
            </div>

            <div class="space-y-4">
              <h2 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Bienvenido de vuelta
              </h2>
              <p class="text-xl text-slate-300 leading-relaxed">
                Accede a tu cuenta y continúa donde lo dejaste. Tu experiencia personalizada te está esperando.
              </p>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3 text-white">
              <Shield class="w-5 h-5 text-blue-400" />
              <span>Autenticación segura de extremo a extremo</span>
            </div>
            <div class="flex items-center space-x-3 text-white">
              <Sparkles class="w-5 h-5 text-blue-300" />
              <span>Experiencia personalizada y fluida</span>
            </div>
          </div>
        </div>

        <!-- Right side - Login form -->
        <div class="w-full mx-auto lg:mx-0">
          <div class="relative">
            <!-- Glassmorphism card -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl"></div>
            <div class="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

              <!-- Mobile header -->
              <div class="lg:hidden mb-8 text-center">
                <div class="flex items-center justify-center space-x-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center">
                    <Sparkles class="w-5 h-5 text-white" />
                  </div>
                  <h1 class="text-2xl font-bold text-white">NexusAuth</h1>
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
                <p class="text-slate-300">Accede a tu cuenta</p>
              </div>

              <div class="hidden lg:block mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
                <p class="text-slate-300">Ingresa tus credenciales para continuar</p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Email field -->
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail class="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      v-model="formData.email"
                      type="email"
                      autocomplete="email"
                      :class="[
                        'block w-full pl-10 pr-3 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                        errors.email ? 'border-red-400 focus:ring-red-500' : 'border-white/20 hover:border-white/30'
                      ]"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <p v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</p>
                </div>

                <!-- Password field -->
                <div class="space-y-2 mb-8">
                  <label for="password" class="block text-sm font-medium text-slate-200">
                    Contraseña
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock class="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      v-model="formData.password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="current-password"
                      :class="[
                        'block w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                        errors.password ? 'border-red-400 focus:ring-red-500' : 'border-white/20 hover:border-white/30'
                      ]"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      @click="togglePassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-black transition-colors"
                    >
                      <Eye v-if="!showPassword" class="h-5 w-5" />
                      <EyeOff v-else class="h-5 w-5" />
                    </button>
                  </div>
                  <p v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</p>
                </div>


                <!-- Submit button -->
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span v-if="!isLoading" class="flex items-center">
                    Iniciar Sesión
                    <ArrowRight class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
