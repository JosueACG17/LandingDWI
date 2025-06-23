<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="bg-white p-8 rounded-lg shadow-md space-y-6"
    v-slot="{ errors, isSubmitting }">

    <!-- Campo Nombre -->
    <div>
      <label for="name" class="block text-gray-700 font-medium mb-2">Nombre</label>
      <Field name="name" id="name" type="text"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        :class="{ 'border-red-500': errors.name }" />
      <ErrorMessage name="name" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Email -->
    <div>
      <label for="email" class="block text-gray-700 font-medium mb-2">Correo electrónico</label>
      <Field name="email" id="email" type="email"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        :class="{ 'border-red-500': errors.email }" />
      <ErrorMessage name="email" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Teléfono -->
    <div>
      <label for="phone" class="block text-gray-700 font-medium mb-2">Teléfono</label>
      <Field name="phone" id="phone" type="tel"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        :class="{ 'border-red-500': errors.phone }" />
      <ErrorMessage name="phone" class="text-red-500 text-sm mt-1 block" />
    </div>

    <!-- Campo Mensaje -->
    <div>
      <label for="message" class="block text-gray-700 font-medium mb-2">Mensaje</label>
      <Field name="message" id="message" as="textarea" rows="4"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        :class="{ 'border-red-500': errors.message }" />
      <ErrorMessage name="message" class="text-red-500 text-sm mt-1 block" />
    </div>

    <button type="submit"
      class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition w-full disabled:opacity-50 cursor-pointer"
      :disabled="isSubmitting">
      <span v-if="!isLoading">Enviar mensaje</span>
      <span v-else>Enviando...</span>
    </button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits(['submit'])

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
  await new Promise(resolve => setTimeout(resolve, 1500))
  emit('submit', { values, resetForm })
}
</script>
