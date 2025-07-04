import axios from 'axios'
import type { MessagePayload, Message } from '@/types/MessagePayload';

const API_BASE = 'http://localhost:3000';

export const sendMessage = async (payload: MessagePayload) => {
  console.log('Sending message:', payload);
  const response = await axios.post(`${API_BASE}/message`, payload);
  console.log('Response from server:', response.data);
  return response.data;
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_BASE}/message`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
