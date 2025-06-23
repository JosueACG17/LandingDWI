<template>
  <header class="bg-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-indigo-600">Desarrollo Web Integral</h1>
      <!-- Botón hamburguesa para móvil -->
      <button
        @click="menuAbierto = !menuAbierto"
        class="md:hidden text-gray-600 focus:outline-none cursor-pointer hover:bg-blue-600 hover:text-white p-2 rounded transition"
        aria-label="Abrir menú"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <!-- Navegación escritorio -->
      <nav class="space-x-4 hidden md:flex transition">
        <a href="#home" class="text-gray-600 hover:text-indigo-600 transition">Inicio</a>
        <a href="#features" class="text-gray-600 hover:text-indigo-600 transition">Servicios</a>
        <a href="#contact" class="text-gray-600 hover:text-indigo-600 transition">Contacto</a>
      </nav>
    </div>
    <!-- Navegación móvil -->
    <nav
      v-if="menuAbierto"
      class="md:hidden bg-white px-6 pb-4 flex flex-col space-y-2 shadow"
    >
      <a href="#home" class="text-gray-600 hover:text-indigo-600 transition">Inicio</a>
      <a href="#features" class="text-gray-600 hover:text-indigo-600 transition">Servicios</a>
      <a href="#contact" class="text-gray-600 hover:text-indigo-600 transition">Contacto</a>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const menuAbierto = ref(false)
</script>
