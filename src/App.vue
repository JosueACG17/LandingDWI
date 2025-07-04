<template>
  <div>
    <div v-if="showLayout">
      <SidebarComponent />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarComponent from './views/Admin/Components/SidebarComponent.vue'

const route = useRoute()
const showLayout = computed(() => route.meta.layout !== false)
</script>
