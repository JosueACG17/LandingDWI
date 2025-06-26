<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 "
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-xl p-8 shadow-lg max-w-sm w-full text-center animate-fade-in-down">
        <!-- Icono dinámico -->
        <component
          :is="statusIcon"
          class="mx-auto mb-4 w-16 h-16"
          :class="iconColor"
        />

        <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
        <p class="text-gray-600 mb-4">{{ message }}</p>
        <button
          @click="$emit('close')"
          class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { CheckIcon, ExclamationTriangleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value: string) => ['success', 'error', 'warning'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Entendido'
  }
})

const emit = defineEmits(['close'])

const statusIcon = computed(() => {
  switch (props.type) {
    case 'success': return CheckIcon
    case 'error': return ExclamationCircleIcon
    case 'warning': return ExclamationTriangleIcon
    default: return CheckIcon
  }
})

const iconColor = computed(() => {
  switch (props.type) {
    case 'success': return 'text-green-500'
    case 'error': return 'text-red-500'
    case 'warning': return 'text-yellow-500'
    default: return 'text-indigo-500'
  }
})
</script>

<style scoped>
.animate-fade-in-down {
  animation: fade-in-down 0.4s ease-out;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
