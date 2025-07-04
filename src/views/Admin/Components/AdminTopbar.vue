<template>
  <header class="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
    <div class="flex items-center justify-between h-16 px-6">
      <!-- Left Section -->
      <div class="flex items-center space-x-4">
        <button @click="$emit('toggle-sidebar')"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Breadcrumb -->
        <nav class="hidden md:flex items-center space-x-2 text-sm">
          <span class="text-gray-900 font-medium">{{ activeItem }}</span>
        </nav>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative hidden md:block">
          <input type="text" placeholder="Buscar..."
            class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            :value="searchQuery" @input="$emit('update-search', ($event.target as HTMLInputElement).value)">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Notifications -->
        <div class="relative">
          <button @click="$emit('toggle-notifications')"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19H6.5a2.5 2.5 0 010-5H8" />
            </svg>
            <span
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <transition name="dropdown">
            <div v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div class="p-4 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900">Notificaciones</h3>
                  <button @click="$emit('mark-all-read')" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Marcar todas
                  </button>
                </div>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <div v-for="notification in notifications" :key="notification.id"
                  class="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                  @click="$emit('mark-read', notification.id)">
                  <div class="flex items-start space-x-3">
                    <div
                      :class="['w-2 h-2 rounded-full mt-2 flex-shrink-0', notification.unread ? 'bg-blue-500' : 'bg-gray-300']">
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ notification.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button @click="$emit('toggle-profile')"
            class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <img class="w-8 h-8 rounded-full object-cover"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/250px-User_icon_2.svg.png"
              alt="Profile">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Profile Menu -->
          <transition name="dropdown">
            <div v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div class="py-1">
                <!-- Bloque de usuario -->
                <div class="px-4 py-3">
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ authStore.user?.nombre }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    {{ authStore.user?.email }}
                  </p>
                </div>
                <hr class="my-1" />

                <!-- Botón de logout -->
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click.prevent="logout">
                  Cerrar Sesión
                </a>
              </div>
            </div>

          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import type { Notification } from '@/types/LayoutAdmin';

const props = defineProps({
  activeItem: {
    type: String,
    required: true
  },
  searchQuery: {
    type: String,
    required: true
  },
  unreadNotifications: {
    type: Number,
    required: true
  },
  showNotifications: {
    type: Boolean,
    required: true
  },
  showProfileMenu: {
    type: Boolean,
    required: true
  },
  notifications: {
    type: Array as () => Notification[],
    default: () => []
  }
})

defineEmits([
  'toggle-sidebar',
  'toggle-notifications',
  'toggle-profile',
  'update-search',
  'mark-all-read',
  'mark-read'
])

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  try {
    authStore.logout()
    await router.replace('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
