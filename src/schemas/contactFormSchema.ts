import * as yup from 'yup';

export const contactFormSchema = yup.object({
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
});
