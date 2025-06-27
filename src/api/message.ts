import axios from 'axios'
import type { MessagePayload } from '@/interface/MessagePayload';

const API_BASE = 'http://localhost:3000';

export const sendMessage = async (payload: MessagePayload) => {
  console.log('Sending message:', payload);
  const response = await axios.post(`${API_BASE}/message`, payload);
  console.log('Response from server:', response.data);
  return response.data;
};
