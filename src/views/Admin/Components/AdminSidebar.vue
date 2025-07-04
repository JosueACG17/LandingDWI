<template>
  <div
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
      open ? 'translate-x-0' : '-translate-x-full',
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
        @click="$emit('toggle')"
        class="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Navigation -->
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
                @click="$emit('set-active', child.name)"
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

    <!-- User Profile -->
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
</template>

<script setup lang="ts">

interface NavigationItem {
  name: string;
  icon?: string;
  children?: { name: string }[];
}

const props = defineProps({
  open: Boolean,
  navigation: {
    type: Array as () => NavigationItem[],
    required: true
  },
  activeItem: {
    type: String,
    required: true
  },
  openSubmenus: {
    type: Array as () => string[],
    required: true
  }
})

const emit = defineEmits(['toggle', 'set-active'])

const handleNavClick = (item: NavigationItem) => {
  if (item.children) {
    const index = props.openSubmenus.indexOf(item.name)
    if (index > -1) {
      props.openSubmenus.splice(index, 1)
    } else {
      props.openSubmenus.push(item.name)
    }
  } else {
    emit('set-active', item.name)
  }
}
</script>

<style scoped>
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
</style>
