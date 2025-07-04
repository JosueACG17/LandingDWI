<template>
  <div class="admin-layout flex h-screen bg-gray-50 overflow-hidden">
    <AdminSidebar
      :open="sidebarOpen"
      :navigation="navigation"
      :active-item="activeItem"
      :open-submenus="openSubmenus"
      @toggle="sidebarOpen = !sidebarOpen"
      @set-active="setActiveItem"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar
        :active-item="activeItem"
        :search-query="searchQuery"
        :unread-notifications="unreadNotifications"
        :show-notifications="showNotifications"
        :show-profile-menu="showProfileMenu"
        @toggle-sidebar="sidebarOpen = true"
        @toggle-notifications="toggleNotifications"
        @toggle-profile="toggleProfileMenu"
        @update-search="searchQuery = $event"
        @mark-all-read="markAllAsRead"
        @mark-read="markAsRead"
      />

      <main class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <slot></slot>
      </main>
    </div>

    <transition name="overlay">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminSidebar from '@/views/Admin/Components/AdminSidebar.vue'
import AdminTopbar from '@/views/Admin/Components/AdminTopbar.vue'
import type { NavigationItem, Notification } from '@/types/LayoutAdmin'

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)
const openSubmenus = ref(['Analytics'])
const showNotifications = ref(false)
const showProfileMenu = ref(false)
const searchQuery = ref('')

const navigation = ref<NavigationItem[]>([
  {
    name: 'Dashboard',
    icon: 'dashboard'
  },
  {
    name: 'Usuarios',
    icon: 'users'
  }
])

const routeMap: Record<string, string> = {
  'Dashboard': '/dashboard',
  'Usuarios': '/users'
}

const pathMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Usuarios'
}

const activeItem = computed(() => {
  return pathMap[route.path] || ''
})

const notifications = ref<Notification[]>([
  { id: 1, title: 'Nuevo pedido recibido #1847', time: 'Hace 5 min', unread: true },
  { id: 2, title: 'Usuario Carlos se registró', time: 'Hace 15 min', unread: true },
  { id: 3, title: 'Pago de $2,500 procesado', time: 'Hace 1 hora', unread: true },
  { id: 4, title: 'Reporte mensual generado', time: 'Hace 2 horas', unread: false }
])

const unreadNotifications = computed(() =>
  notifications.value.filter(n => n.unread).length
)

const setActiveItem = (itemName: string): void => {
  sidebarOpen.value = false
  router.push(routeMap[itemName] || '/dashboard')
}

const toggleNotifications = (): void => {
  showNotifications.value = !showNotifications.value
  showProfileMenu.value = false
}

const toggleProfileMenu = (): void => {
  showProfileMenu.value = !showProfileMenu.value
  showNotifications.value = false
}

const markAsRead = (id: number): void => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.unread = false
}

const markAllAsRead = (): void => {
  notifications.value.forEach(n => n.unread = false)
}

const handleClickOutside = (event: MouseEvent): void => {
  if (!(event.target as HTMLElement).closest('.relative')) {
    showNotifications.value = false
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
