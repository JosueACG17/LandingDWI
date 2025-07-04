<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:flex lg:flex-col'
      ]"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-100 flex-shrink-0">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">LeadFlowCRM</span>
        </div>
        <button
          @click="sidebarOpen = false"
          class="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Navigation - Scrollable -->
      <nav class="flex-1 overflow-y-auto px-3 py-6">
        <div class="space-y-1">
          <div
            v-for="item in navigation"
            :key="item.name"
            class="relative"
          >
            <button
              @click="handleNavClick(item)"
              :class="[
                'w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                activeItem === item.name
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              ]"
            >
              <div class="flex items-center space-x-3">
                <component :is="getIconComponent(item.icon)" />
                <span>{{ item.name }}</span>
              </div>
              <svg
                v-if="item.children"
                :class="[
                  'w-4 h-4 transition-transform duration-200',
                  openSubmenus.includes(item.name) ? 'rotate-180' : ''
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Submenu -->
            <transition name="submenu">
              <div
                v-if="item.children && openSubmenus.includes(item.name)"
                class="mt-1 ml-8 space-y-1"
              >
                <button
                  v-for="child in item.children"
                  :key="child.name"
                  @click="setActiveItem(child.name)"
                  :class="[
                    'w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-150',
                    activeItem === child.name
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  ]"
                >
                  {{ child.name }}
                </button>
              </div>
            </transition>
          </div>
        </div>
      </nav>

      <!-- User Profile Section - Fixed at bottom -->
      <div class="border-t border-gray-100 p-4 flex-shrink-0">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <img
            class="w-10 h-10 rounded-full object-cover ring-2 ring-white"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/250px-User_icon_2.svg.png"
            alt="Usuario"
          >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">Arbey Dzib</p>
            <p class="text-xs text-gray-500 truncate">Admin</p>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header class="bg-white shadow-sm border-b border-gray-200 flex-shrink-0 z-30">
        <div class="flex items-center justify-between h-16 px-6">
          <!-- Left Section -->
          <div class="flex items-center space-x-4">
            <button
              @click="sidebarOpen = true"
              class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <!-- Breadcrumb -->
            <nav class="hidden md:flex items-center space-x-2 text-sm">
              <span class="text-gray-500">Dashboard</span>
              <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-900 font-medium">{{ activeItem }}</span>
            </nav>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                v-model="searchQuery"
              >
              <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- Notifications -->
            <div class="relative">
              <button
                @click="toggleNotifications"
                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19H6.5a2.5 2.5 0 010-5H8"/>
                </svg>
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {{ unreadNotifications }}
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <transition name="dropdown">
                <div
                  v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div class="p-4 border-b border-gray-100">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-semibold text-gray-900">Notificaciones</h3>
                      <button
                        @click="markAllAsRead"
                        class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Marcar todas
                      </button>
                    </div>
                  </div>
                  <div class="max-h-64 overflow-y-auto">
                    <div
                      v-for="notification in notifications"
                      :key="notification.id"
                      class="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                      @click="markAsRead(notification.id)"
                    >
                      <div class="flex items-start space-x-3">
                        <div :class="['w-2 h-2 rounded-full mt-2 flex-shrink-0', notification.unread ? 'bg-blue-500' : 'bg-gray-300']"></div>
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
              <button
                @click="toggleProfileMenu"
                class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  class="w-8 h-8 rounded-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/250px-User_icon_2.svg.png"
                  alt="Profile"
                >
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Profile Menu -->
              <transition name="dropdown">
                <div
                  v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Mi Perfil</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Configuración</a>
                    <hr class="my-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Cerrar Sesión</a>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content - Scrollable -->
      <main class="flex-1 overflow-y-auto p-4">
        <div class=" mx-auto">
          <!-- Content Area -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-2xl font-bold text-gray-900">{{ activeItem }}</h1>
              <div class="flex items-center space-x-3">
                <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Exportar
                </button>
                <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Nuevo
                </button>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-600 text-sm font-medium">Total Usuarios</p>
                    <p class="text-2xl font-bold text-blue-900">2,847</p>
                    <p class="text-xs text-blue-600 mt-1">+12% vs mes anterior</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-green-600 text-sm font-medium">Ventas Hoy</p>
                    <p class="text-2xl font-bold text-green-900">$12,847</p>
                    <p class="text-xs text-green-600 mt-1">+8% vs ayer</p>
                  </div>
                  <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-purple-600 text-sm font-medium">Pedidos</p>
                    <p class="text-2xl font-bold text-purple-900">847</p>
                    <p class="text-xs text-purple-600 mt-1">+15% vs semana</p>
                  </div>
                  <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-orange-600 text-sm font-medium">Conversión</p>
                    <p class="text-2xl font-bold text-orange-900">3.2%</p>
                    <p class="text-xs text-orange-600 mt-1">+0.5% vs promedio</p>
                  </div>
                  <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Area for Tables -->
            <div class="bg-gray-50 border-2 border-gray-300 rounded-lg  text-center">
              <TableComponent />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <transition name="overlay">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TableComponent from '@/components/TableComponent.vue'

// Reactive data
const sidebarOpen = ref(false)
const activeItem = ref('Dashboard')
const openSubmenus = ref(['Analytics'])
const showNotifications = ref(false)
const showProfileMenu = ref(false)
const searchQuery = ref('')

// Navigation data
const navigation = ref([
  {
    name: 'Dashboard',
    icon: 'dashboard'
  },
  {
    name: 'Analytics',
    icon: 'analytics',
    children: [
      { name: 'Reportes' },
      { name: 'Métricas' },
      { name: 'KPIs' }
    ]
  },
  {
    name: 'Usuarios',
    icon: 'users',
    children: [
      { name: 'Lista de Usuarios' },
      { name: 'Roles' },
      { name: 'Permisos' }
    ]
  },
  {
    name: 'Productos',
    icon: 'products'
  },
  {
    name: 'Ventas',
    icon: 'sales',
    children: [
      { name: 'Pedidos' },
      { name: 'Facturas' },
      { name: 'Pagos' }
    ]
  },
  {
    name: 'Configuración',
    icon: 'settings'
  }
])

// Notifications data
const notifications = ref([
  { id: 1, title: 'Nuevo pedido recibido #1847', time: 'Hace 5 min', unread: true },
  { id: 2, title: 'Usuario Carlos se registró', time: 'Hace 15 min', unread: true },
  { id: 3, title: 'Pago de $2,500 procesado', time: 'Hace 1 hora', unread: true },
  { id: 4, title: 'Reporte mensual generado', time: 'Hace 2 horas', unread: false }
])

// Computed
const unreadNotifications = computed(() =>
  notifications.value.filter(n => n.unread).length
)

// Icon components mapping
const iconComponents = {
  dashboard: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v4M12 5v4M16 5v4"/>
      </svg>
    `
  },
  analytics: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    `
  },
  users: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
      </svg>
    `
  },
  products: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    `
  },
  sales: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    `
  },
  settings: {
    template: `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    `
  }
}

// Methods
const getIconComponent = (iconName) => {
  return iconComponents[iconName] || iconComponents.dashboard
}

const handleNavClick = (item) => {
  if (item.children) {
    toggleSubmenu(item.name)
  } else {
    setActiveItem(item.name)
  }
}

const toggleSubmenu = (itemName) => {
  const index = openSubmenus.value.indexOf(itemName)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(itemName)
  }
}

const setActiveItem = (itemName) => {
  activeItem.value = itemName
  sidebarOpen.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showProfileMenu.value = false
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
  showNotifications.value = false
}

const markAsRead = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.unread = false
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.unread = false)
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
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
/* Transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
