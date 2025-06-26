<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="bg-white p-8 rounded-xl shadow-lg space-y-6 max-w-lg mx-auto my-8">
    <!-- Campo Nombre -->
    <div>
      <label for="name" class="block text-gray-700 font-medium mb-2">Nombre</label>
      <Field name="name" id="name" type="text"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.name }" />
      <ErrorMessage name="name" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Email -->
    <div>
      <label for="email" class="block text-gray-700 font-medium mb-2">Correo electrónico</label>
      <Field name="email" id="email" type="email"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.email }" />
      <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Teléfono -->
    <div>
      <label for="phone" class="block text-gray-700 font-medium mb-2">Teléfono</label>
      <Field name="phone" id="phone" type="tel"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        :class="{ 'border-red-500': errors.phone }" />
      <ErrorMessage name="phone" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Mensaje -->
    <div>
      <label for="message" class="block text-gray-700 font-medium mb-2">Mensaje</label>
      <Field name="message" id="message" as="textarea" rows="4"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        :class="{ 'border-red-500': errors.message }" />
      <ErrorMessage name="message" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Aviso de privacidad -->
    <div>
      <label class="inline-flex items-center">
        <input type="checkbox" v-model="privacidadAceptada" class="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500" />
        <span class="ml-2 text-gray-700 text-sm">
          Acepto los
          <button type="button" class="cursor-pointer text-blue-600 font-semibold underline hover:text-blue-800 focus:outline-none" @click="mostrarTerminos = true">
            Términos y Condiciones
          </button>
          y
          <button type="button" class="cursor-pointer text-blue-600 font-semibold underline hover:text-blue-800 focus:outline-none" @click="mostrarAviso = true">
            Aviso de Privacidad
          </button>
        </span>
      </label>
      <div v-if="mostrarErrorPrivacidad" class="text-red-500 text-sm mt-1">Debes aceptar el aviso de privacidad para continuar.</div>
    </div>

    <!-- Feedback -->
    <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="text-center text-sm font-medium mt-2">
      {{ message }}
    </div>

    <button type="submit"
      class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition w-full disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
      :disabled="isSubmitting || !privacidadAceptada">
      <span v-if="!isSubmitting">Enviar mensaje</span>
      <span v-else>Enviando...</span>
    </button>

    <!-- reCAPTCHA info -->
    <div class="text-center text-xs text-gray-500 mt-4">
      Este sitio está protegido por reCAPTCHA y las Políticas de Privacidad y los Términos de Servicio de Google son aplicables.
    </div>

    <!-- Modales -->
    <ModalComponent
      :show="mostrarTerminos"
      type="warning"
      title="Términos y Condiciones"
      :message="textoTerminos"
      button-text="Cerrar"
      @close="mostrarTerminos = false"
    />
    <ModalComponent
      :show="mostrarAviso"
      type="warning"
      title="Aviso de Privacidad"
      :message="textoAviso"
      button-text="Cerrar"
      @close="mostrarAviso = false"
    />
  </Form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import { useReCaptcha } from 'vue-recaptcha-v3';

defineProps<{ isLoading: boolean }>();
const emit = defineEmits(['submit']);

const privacidadAceptada = ref(false);
const mostrarErrorPrivacidad = ref(false);
const mostrarTerminos = ref(false);
const mostrarAviso = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | ''>('');

const { errors, isSubmitting } = useForm();
const recaptcha = useReCaptcha();

watch(() => recaptcha?.recaptchaLoaded?.value, (loaded) => {
  if (loaded) {
    console.log('reCAPTCHA v3 script cargado y listo.');
  }
});

const textoTerminos = `Estos son los Términos y Condiciones ficticios...`;
const textoAviso = `Este es un Aviso de Privacidad ficticio...`;

const schema = yup.object({
  name: yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no debe superar los 50 caracteres'),
  email: yup.string()
    .required('El correo electrónico es requerido')
    .email('El correo no es válido'),
   phone: yup.string()
    .required('El teléfono es requerido')
    .matches(/^\d+$/, 'El teléfono solo debe contener números')
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no debe superar los 15 dígitos'),
  message: yup.string()
    .required('El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no debe superar los 500 caracteres')
})

const onSubmit = async (values: any, { resetForm }: any) => {
  message.value = '';
  messageType.value = '';

  if (!privacidadAceptada.value) {
    mostrarErrorPrivacidad.value = true;
    message.value = 'Debes aceptar el aviso de privacidad.';
    messageType.value = 'error';
    return;
  }

  mostrarErrorPrivacidad.value = false;

  try {
    if (!recaptcha || !recaptcha.executeRecaptcha) {
      message.value = 'No se pudo inicializar reCAPTCHA. Intenta de nuevo más tarde.';
      messageType.value = 'error';
      return;
    }

    const recaptchaToken = await recaptcha.executeRecaptcha('contact_form_submission');

    if (!recaptchaToken) {
      message.value = 'Error de verificación de seguridad.';
      messageType.value = 'error';
      return;
    }

    emit('submit', { values, recaptchaToken, resetForm });

  } catch (error) {
    console.error('Error al enviar:', error);
    message.value = 'Ocurrió un error inesperado.';
    messageType.value = 'error';
  }
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
}
</style>
