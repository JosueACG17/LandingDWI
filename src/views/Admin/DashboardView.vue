<template>
  <AdminLayout>
    <main class="flex-1 overflow-y-auto p-4">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 text-center">¡Bienvenido de nuevo, {{ authStore.user?.nombre }}!</h1>
      </div>
      <div class="mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mensajes de Contacto</h1>
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              @click="refreshMessages">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </div>
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-600 text-sm font-medium">Total Mensajes</p>
                  <p class="text-2xl font-bold text-blue-900">{{ stats.totalMessages }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-green-600 text-sm font-medium">Mensajes hoy</p>
                  <p class="text-2xl font-bold text-green-900">{{ stats.messagesToday }}</p>
                </div>
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-orange-600 text-sm font-medium">Promedio diario</p>
                  <p class="text-2xl font-bold text-orange-900">{{ stats.dailyAverage }}</p>
                </div>
                <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Filtros con botones -->
          <div class="flex flex-wrap gap-2 mb-4 ">
            <button
              @click="statusFilter = 'all'"
              :class="{
                'bg-gray-900 text-white': statusFilter === 'all',
                'bg-gray-100 text-gray-700 hover:bg-gray-200': statusFilter !== 'all'
              }"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
            >
              <span class="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
              Todos
              <span class="ml-1 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                {{ stats.totalAllMessages }}
              </span>
            </button>

            <button
              @click="statusFilter = 'NUEVO'"
              :class="{
                'bg-blue-600 text-white': statusFilter === 'NUEVO',
                'bg-blue-100 text-blue-700 hover:bg-blue-200': statusFilter !== 'NUEVO'
              }"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
            >
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Nuevos
              <span
                :class="{
                  'bg-blue-100 text-blue-800': statusFilter !== 'NUEVO',
                  'bg-white text-blue-600': statusFilter === 'NUEVO'
                }"
                class="ml-1 rounded-full px-2 py-0.5 text-xs"
              >
                {{ stats.totalNewMessages }}
              </span>
            </button>

            <button
              @click="statusFilter = 'CONTACTADO'"
              :class="{
                'bg-green-600 text-white': statusFilter === 'CONTACTADO',
                'bg-green-100 text-green-700 hover:bg-green-200': statusFilter !== 'CONTACTADO'
              }"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
            >
              <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Contactados
              <span
                :class="{
                  'bg-green-100 text-green-800': statusFilter !== 'CONTACTADO',
                  'bg-white text-green-600': statusFilter === 'CONTACTADO'
                }"
                class="ml-1 rounded-full px-2 py-0.5 text-xs"
              >
                {{ stats.totalContactedMessages }}
              </span>
            </button>

            <button
              @click="statusFilter = 'DESCARTADO'"
              :class="{
                'bg-red-600 text-white': statusFilter === 'DESCARTADO',
                'bg-red-100 text-red-700 hover:bg-red-200': statusFilter !== 'DESCARTADO'
              }"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
            >
              <span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              Descartados
              <span
                :class="{
                  'bg-red-100 text-red-800': statusFilter !== 'DESCARTADO',
                  'bg-white text-red-600': statusFilter === 'DESCARTADO'
                }"
                class="ml-1 rounded-full px-2 py-0.5 text-xs"
              >
                {{ stats.totalDiscardedMessages }}
              </span>
            </button>
          </div>

          <!-- Tabla de mensajes -->
          <div class="bg-gray-50 border-2 border-gray-300 rounded-lg">
            <TableComponent
              title="Lista de Mensajes"
              :headers="tableHeaders"
              :rows="filteredMessages"
              :loading="loading"
              @action-clicked="handleStatusChange"
            />
          </div>
        </div>
      </div>
      <!-- Notificación -->
<NotificationToast
  v-model:show="showNotification"
  :type="notification.type"
  :message="notification.message"
/>

    </main>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '@/layout/AdminLayout.vue';
import TableComponent from '@/components/TableComponent.vue';
import { getMessages, updateMessageStatus } from '@/services/message';
import type { Message } from '@/types/MessagePayload';
import { useAuthStore } from '@/stores/authStore'
import NotificationToast from '@/components/NotificationToast.vue'


const authStore = useAuthStore();
const loading = ref(true);
const messages = ref<Message[]>([]);
const statusFilter = ref('all');
const showNotification = ref(false)
const notification = ref<{ type: 'success' | 'error'; message: string }>({ type: 'success', message: '' })

const triggerNotification = (type: 'success' | 'error', message: string) => {
  notification.value = { type, message }
  showNotification.value = true
}



const tableHeaders = [
  { label: 'Nombre', key: 'nombre' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'telefono' },
  { label: 'Mensaje', key: 'mensaje' },
  {
    label: 'Estado',
    key: 'status',
    actions: [
      { label: 'Marcar como Contactado', value: 'CONTACTADO', class: 'text-green-600 hover:bg-green-50' },
      { label: 'Marcar como Descartado', value: 'DESCARTADO', class: 'text-red-600 hover:bg-red-50' },
      { label: 'Marcar como Nuevo', value: 'NUEVO', class: 'text-blue-600 hover:bg-blue-50' }
    ]
  },
  { label: 'Fecha', key: 'createdAt' }
];

// Mensajes filtrados por estado
const filteredMessages = computed(() => {
  const allMessages = messages.value.map(message => ({
    ...message,
    id: message.id, // Asegurarnos de incluir el ID
    nombre: message.nombre,
    email: `<a href="mailto:${message.email}" class="text-blue-600 hover:underline">${message.email}</a>`,
    telefono: message.telefono ? `<a href="tel:${message.telefono}" class="text-blue-600 hover:underline">${message.telefono}</a>` : 'N/A',
    mensaje: message.mensaje.length > 50 ? `${message.mensaje.substring(0, 50)}...` : message.mensaje,
    status: getStatusBadge(message.validate_view || 'NUEVO'),
    createdAt: formatDate(message.createdAt),
    rawStatus: message.validate_view || 'NUEVO'
  }));

  if (statusFilter.value === 'all') {
    return allMessages;
  }
  return allMessages.filter(msg => msg.rawStatus === statusFilter.value);
});

// Función para mostrar el estado con un badge de color
const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { class: string, text: string }> = {
    'NUEVO': { class: 'bg-blue-100 text-blue-800', text: 'Nuevo' },
    'CONTACTADO': { class: 'bg-green-100 text-green-800', text: 'Contactado' },
    'DESCARTADO': { class: 'bg-red-100 text-red-800', text: 'Descartado' }
  };

  const statusInfo = statusMap[status] || { class: 'bg-gray-100 text-gray-800', text: status };
  return `<span class="px-2 py-1 text-xs font-medium rounded-full ${statusInfo.class}">${statusInfo.text}</span>`;
};

// Estadísticas computadas
const stats = computed(() => {
  const totalAllMessages = messages.value.length;
  const totalNewMessages = messages.value.filter(msg => !msg.validate_view || msg.validate_view === 'NUEVO').length;
  const totalContactedMessages = messages.value.filter(msg => msg.validate_view === 'CONTACTADO').length;
  const totalDiscardedMessages = messages.value.filter(msg => msg.validate_view === 'DESCARTADO').length;

  const filtered = statusFilter.value === 'all'
    ? messages.value
    : messages.value.filter(msg => msg.validate_view === statusFilter.value);

  const totalMessages = filtered.length;
  const messagesToday = filtered.filter(msg => {
    const msgDate = new Date(msg.createdAt);
    const today = new Date();
    return msgDate.getDate() === today.getDate() &&
      msgDate.getMonth() === today.getMonth() &&
      msgDate.getFullYear() === today.getFullYear();
  }).length;

  return {
    totalMessages,
    messagesToday,
    dailyAverage: Math.round(messages.value.length / 7),
    totalAllMessages,
    totalNewMessages,
    totalContactedMessages,
    totalDiscardedMessages
  };
});

// Función para formatear la fecha
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

// Función para cambiar el estado de un mensaje
const handleStatusChange = async (data: { rowId: string; actionValue: string }) => {
  try {
    loading.value = true;
    const { rowId, actionValue } = data;
await updateMessageStatus(Number(rowId), { validate_view: actionValue });
    triggerNotification('success', 'Estado del mensaje actualizado correctamente');
    await loadMessages();
  } catch (error) {
    console.error('Error updating message status:', error);
    triggerNotification('error', 'Hubo un error al actualizar el mensaje');
  } finally {
    loading.value = false;
  }
};

// Función para cargar mensajes
const loadMessages = async () => {
  try {
    loading.value = true;
    messages.value = await getMessages();
  } catch (error) {
    console.error('Error loading messages:', error);
  } finally {
    loading.value = false;
  }
};

// Función para actualizar mensajes
const refreshMessages = async () => {
  await loadMessages();
};

// Cargar los mensajes al montar el componente
onMounted(loadMessages);
</script>
