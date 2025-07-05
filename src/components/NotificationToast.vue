<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-20 right-1 max-w-sm w-full rounded-b px-4 py-3 shadow-md flex z-50',
      type === 'success'
        ? 'bg-teal-100 border-t-4 border-teal-500 text-teal-900'
        : 'bg-red-100 border-t-4 border-red-500 text-red-900'
    ]"
    role="alert"
  >
    <div class="flex-shrink-0 py-1">
      <svg
        v-if="type === 'success'"
        class="fill-current h-6 w-6 mr-4 text-teal-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9 12l-2-2-1 1 3 3 7-7-1-1-6 6z" />
      </svg>
      <svg
        v-else
        class="fill-current h-6 w-6 mr-4 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
        />
      </svg>
    </div>
    <div>
      <p class="font-bold">
        {{ type === 'success' ? 'Éxito' : 'Error' }}
      </p>
      <p class="text-sm">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  type: 'success' | 'error'
  message: string
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const visible = ref(props.show)

watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal) {
    setTimeout(() => emit('update:show', false), 4000)
  }
})
</script>
