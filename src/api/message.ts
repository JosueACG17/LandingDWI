import axios from 'axios'
import type { MessagePayload } from '@/interface/MessagePayload';

const API_BASE = 'http://localhost:3000';

export const sendMessage = async (payload: MessagePayload) => {
  const response = await axios.post(`${API_BASE}/message`, payload);
  return response.data;
};
