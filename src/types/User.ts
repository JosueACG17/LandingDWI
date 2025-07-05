export interface User {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  createdAt: string;
}

export interface UserPayload {
  nombre: string;
  email: string;
  telefono: string;
  password?: string;
}
