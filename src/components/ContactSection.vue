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

      <!-- Mensaje enviado con éxito -->
      <div v-else-if="formSubmitted" class="bg-white p-8 rounded-lg shadow-md text-center">
        <svg class="mx-auto mb-4 text-green-500 w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">¡Gracias por contactarnos!</h2>
        <p class="text-gray-600 mb-4">Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <button @click="resetForm"
          class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Enviar otro mensaje
        </button>
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
import { sendMessage } from '@/api/message'
import ContactForm from '@/components/ContactForm.vue'
import ModalComponent from './ui/ModalComponent.vue'

const BLOCK_DURATION = 10 * 60 * 1000
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')
const formSubmitted = ref(false)
const isLoading = ref(false)
const lastSubmissionTime = ref<number | null>(null)


const isFormBlocked = computed(() => {
  if (!lastSubmissionTime.value) return false
  return (Date.now() - lastSubmissionTime.value) < BLOCK_DURATION
})

const remainingMinutes = computed(() => {
  if (!lastSubmissionTime.value) return 0
  return Math.ceil((BLOCK_DURATION - (Date.now() - lastSubmissionTime.value)) / (60 * 1000))
})


onMounted(() => {
  const savedTime = localStorage.getItem('lastFormSubmission')
  if (savedTime) lastSubmissionTime.value = parseInt(savedTime)
})

const resetForm = () => {
  formSubmitted.value = false
}


const onSubmit = async ({ values, resetForm: resetFormFn }: any) => {
  isLoading.value = true

  try {
    if (isFormBlocked.value) {
      errorMessage.value = `Por favor espera ${remainingMinutes.value} minutos antes de enviar otro mensaje.`
      showErrorModal.value = true
      return
    }

    await sendMessage({
      nombre: values.name,
      email: values.email,
      telefono: values.phone,
      mensaje: values.message,
      captcha:values.captcha // Asegúrate de que este campo sea el correcto según tu formulario
    })


    const now = Date.now()
    localStorage.setItem('lastFormSubmission', now.toString())
    lastSubmissionTime.value = now
    resetFormFn()
    formSubmitted.value = true
    showSuccessModal.value = true

  } catch (error: any) {
    errorMessage.value = error.response?.data?.message ||
      error.message ||
      'Error al enviar el mensaje. Por favor intenta nuevamente.'

    if (error.response?.status === 429) {
      const now = Date.now()
      localStorage.setItem('lastFormSubmission', now.toString())
      lastSubmissionTime.value = now
    }

    showErrorModal.value = true
    console.error('Error en el formulario:', error)
  } finally {
    const checkModalClosed = () => {
      if (!showSuccessModal.value && !showErrorModal.value) {
        isLoading.value = false
      } else {
        setTimeout(checkModalClosed, 100)
      }
    }
    checkModalClosed()
  }
}

</script>
