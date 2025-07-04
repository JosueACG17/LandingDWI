<template>
  <section id="contact" class="py-20 bg-indigo-100">
    <div class="container mx-auto px-6 max-w-3xl">
      <h3 class="text-3xl font-semibold text-center text-gray-800 mb-8">Contáctanos</h3>

      <!-- Formulario bloqueado -->
      <div v-if="isFormBlocked" class="bg-white p-8 rounded-lg shadow-md text-center">
        <svg class="mx-auto mb-4 text-yellow-500 w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Espera un momento</h2>
        <p class="text-gray-600 mb-4">
          Ya enviaste un mensaje recientemente. Por favor intenta nuevamente en
          <span class="font-bold">{{ remainingMinutes }}</span> minutos.
        </p>
      </div>

      <!-- Formulario activo -->
      <ContactForm v-else :isLoading="isLoading" @submit="onSubmit" />
    </div>
  </section>

  <ModalComponent :show="showSuccessModal" type="success" title="¡Mensaje enviado!"
    message="Gracias por contactarnos, te responderemos pronto." @close="showSuccessModal = false" />

  <ModalComponent :show="showErrorModal" type="error" title="¡Error al enviar!"
    message="Ha ocurrido un error al enviar el mensaje" buttonText="Intentar de nuevo"
    @close="showErrorModal = false" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { sendMessage } from '@/services/message'
import ContactForm from '@/components/ContactForm.vue'
import ModalComponent from './ui/ModalComponent.vue'

const BLOCK_DURATION = 10 * 60 * 1000
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const isLoading = ref(false)
const lastSubmissionTime = ref<number | null>(null)

const isFormBlocked = computed(() => {
  return lastSubmissionTime.value
    ? (Date.now() - lastSubmissionTime.value) < BLOCK_DURATION
    : false
})

const remainingMinutes = computed(() => {
  return lastSubmissionTime.value
    ? Math.ceil((BLOCK_DURATION - (Date.now() - lastSubmissionTime.value)) / (60 * 1000))
    : 0
})

// Lifecycle
onMounted(() => {
  const savedTime = localStorage.getItem('lastFormSubmission')
  if (savedTime) lastSubmissionTime.value = parseInt(savedTime)
})

// Métodos
const onSubmit = async ({ values, resetForm: resetFormFn }: any) => {
  isLoading.value = true

  try {
    if (isFormBlocked.value) {
      showErrorModal.value = true
      return
    }

    await sendMessage({
      nombre: values.name,
      email: values.email,
      telefono: values.phone,
      mensaje: values.message,
      captcha: values.captcha
    })

    const now = Date.now()
    localStorage.setItem('lastFormSubmission', now.toString())
    lastSubmissionTime.value = now
    resetFormFn()
    showSuccessModal.value = true

  } catch (error) {
    console.error('Error en el formulario:', error)
    showErrorModal.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
