import type { MessagePayload, Message } from '@/types/MessagePayload';
import { genericRequest } from '@/api/GenericRequest';

export const sendMessage = async (payload: MessagePayload) => {
  console.log('Sending message:', payload);
  try {
    const response = await genericRequest.post<Message>('/message', payload);
    console.log('Response from server:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    return await genericRequest.get<Message[]>('/message');
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};
