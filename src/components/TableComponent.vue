<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b">Nombre</th>
          <th class="px-6 py-3 border-b">Email</th>
          <th class="px-6 py-3 border-b">Estado</th>
          <th class="px-6 py-3 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.email" class="hover:bg-gray-100">
          <td class="px-6 py-4">{{ lead.nombre }}</td>
          <td class="px-6 py-4">{{ lead.email }}</td>
          <td class="px-6 py-4">
            <span :class="lead.estado === 'Activo' ? 'text-green-600' : 'text-gray-500'">{{ lead.estado }}</span>
          </td>
          <td class="px-6 py-4">
            <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Ver</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const leads = [
  { nombre: 'Juan Pérez', email: 'juan@correo.com', estado: 'Activo' },
  { nombre: 'Ana Gómez', email: 'ana@correo.com', estado: 'Inactivo' },
  { nombre: 'Carlos Ruiz', email: 'carlos@correo.com', estado: 'Activo' },
];
</script>
