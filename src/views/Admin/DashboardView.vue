<template>
  <AdminLayout>
    <main class="flex-1 overflow-y-auto p-4">
      <div class="mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mensajes de Contacto</h1>
            <div class="flex items-center space-x-3">
              <button
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                @click="refreshMessages"
              >
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Actualizar
                </div>
              </button>
            </div>
          </div>

          <!-- Stats Cards (opcional, puedes mantenerlas o quitarlas) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-600 text-sm font-medium">Total Mensajes</p>
                  <p class="text-2xl font-bold text-blue-900">{{ stats.totalMessages }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
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
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
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
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabla de mensajes -->
          <div class="bg-gray-50 border-2 border-gray-300 rounded-lg">
            <TableComponent
              title="Lista de Mensajes"
              :headers="tableHeaders"
              :rows="tableRows"
              :loading="loading"
            />
          </div>
        </div>
      </div>
    </main>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AdminLayout from '@/layout/AdminLayout.vue';
import TableComponent from '@/components/TableComponent.vue';
import { getMessages, type Message } from '@/api/message';

const loading = ref(true);
const messages = ref<Message[]>([]);

// Definición de las columnas de la tabla (sin ID ni CAPTCHA)
const tableHeaders = [
  { label: 'Nombre', key: 'nombre' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'telefono' },
  { label: 'Mensaje', key: 'mensaje' },
  { label: 'Fecha', key: 'createdAt'}
];

// Estadísticas computadas (simplificadas)
const stats = computed(() => {
  const totalMessages = messages.value.length;
  const messagesToday = messages.value.filter(msg => {
    const msgDate = new Date(msg.createdAt);
    const today = new Date();
    return msgDate.getDate() === today.getDate() &&
           msgDate.getMonth() === today.getMonth() &&
           msgDate.getFullYear() === today.getFullYear();
  }).length;

  return {
    totalMessages,
    messagesToday,
    dailyAverage: Math.round(totalMessages / 7) 
  };
});

// Filas de la tabla computadas
const tableRows = computed(() => {
  return messages.value.map(message => ({
    nombre: message.nombre,
    email: `<a href="mailto:${message.email}" class="text-blue-600 hover:underline">${message.email}</a>`,
    telefono: message.telefono ? `<a href="tel:${message.telefono}" class="text-blue-600 hover:underline">${message.telefono}</a>` : 'N/A',
    mensaje: message.mensaje.length > 50 ? `${message.mensaje.substring(0, 50)}...` : message.mensaje,
    createdAt: formatDate(message.createdAt)
  }));
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
