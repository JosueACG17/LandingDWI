import { genericRequest } from '@/api/GenericRequest';
import type { User, UserPayload } from '@/types/User';

export const getUsers = async (): Promise<User[]> => {
  try {
    return await genericRequest.get<User[]>('/register');
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (payload: UserPayload): Promise<User> => {
  try {
    return await genericRequest.post<User>('/register', payload);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
