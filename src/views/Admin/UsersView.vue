<template>
  <AdminLayout>
    <main class="flex-1 overflow-y-auto p-4 relative">
      <div class="mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
            <div class="flex items-center space-x-3">
              <button
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                @click="showAddUserModal = true"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Agregar Usuario
              </button>
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                @click="refreshUsers"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <p class="text-blue-600 text-sm font-medium">Total Usuarios</p>
              <p class="text-2xl font-bold text-blue-900">{{ stats.totalUsers }}</p>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <p class="text-green-600 text-sm font-medium">Usuarios hoy</p>
              <p class="text-2xl font-bold text-green-900">{{ stats.usersToday }}</p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <p class="text-purple-600 text-sm font-medium">Promedio diario</p>
              <p class="text-2xl font-bold text-purple-900">{{ stats.dailyAverage }}</p>
            </div>
          </div>

          <!-- Tabla -->
          <div class="bg-gray-50 border-2 border-gray-300 rounded-lg">
            <TableComponent
              title="Lista de Usuarios"
              :headers="tableHeaders"
              :rows="tableRows"
              :loading="loading"
            />
          </div>
        </div>
      </div>

      <!-- Notificación -->
      <div
        v-if="notification"
        :class="[
          'fixed top-20 right-1 max-w-sm w-full rounded-b px-4 py-3 shadow-md flex',
          notification.type === 'success'
            ? 'bg-teal-100 border-t-4 border-teal-500 text-teal-900'
            : 'bg-red-100 border-t-4 border-red-500 text-red-900'
        ]"
        role="alert"
      >
        <div class="flex-shrink-0 py-1">
          <svg
            v-if="notification.type === 'success'"
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
            {{ notification.type === 'success' ? 'Éxito' : 'Error' }}
          </p>
          <p class="text-sm">{{ notification.message }}</p>
        </div>
      </div>

      <!-- Modal agregar usuario -->
      <AddUserModal
        :show="showAddUserModal"
        :existing-users="users"
        @close="showAddUserModal = false"
        @user-created="handleUserCreated"
        @validation-error="handleValidationError"
      />
    </main>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '@/layout/AdminLayout.vue';
import TableComponent from '@/components/TableComponent.vue';
import AddUserModal from '@/components/AddUserModal.vue';
import { getUsers } from '@/services/user';
import type { User } from '@/types/User';

const loading = ref(true);
const users = ref<User[]>([]);
const showAddUserModal = ref(false);

const notification = ref<{ type: 'success' | 'error'; message: string } | null>(null);
const showNotification = (type: 'success' | 'error', message: string) => {
  notification.value = { type, message };
  setTimeout(() => (notification.value = null), 4000);
};

const tableHeaders = [
  { label: 'Nombre', key: 'nombre' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'telefono' },
  { label: 'Fecha Registro', key: 'createdAt' }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const tableRows = computed(() =>
  users.value.map(user => ({
    id: user.id,
    nombre: user.nombre,
    email: `<a href="mailto:${user.email}" class="text-blue-600 hover:underline">${user.email}</a>`,
    telefono: user.telefono
      ? `<a href="tel:${user.telefono}" class="text-blue-600 hover:underline">${user.telefono}</a>`
      : 'N/A',
    createdAt: formatDate(user.createdAt)
  }))
);

const stats = computed(() => {
  const totalUsers = users.value.length;
  const usersToday = users.value.filter(user => {
    const date = new Date(user.createdAt);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }).length;

  return {
    totalUsers,
    usersToday,
    dailyAverage: Math.round(totalUsers / 7)
  };
});

const loadUsers = async () => {
  try {
    loading.value = true;
    users.value = await getUsers();
  } catch (error) {
    console.error(error);
    showNotification('error', 'Error al cargar usuarios');
  } finally {
    loading.value = false;
  }
};

const refreshUsers = async () => {
  await loadUsers();
};

const handleUserCreated = (newUser: User) => {
  users.value.unshift(newUser);
  showAddUserModal.value = false;
  showNotification('success', 'Usuario creado correctamente');
};

const handleValidationError = (message: string) => {
  showNotification('error', message);
};

onMounted(loadUsers);
</script>
