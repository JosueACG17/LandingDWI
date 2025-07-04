export interface MessagePayload {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  captcha: string
}

export interface Message {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  validate_captcha: number;
  createdAt: string;
}
