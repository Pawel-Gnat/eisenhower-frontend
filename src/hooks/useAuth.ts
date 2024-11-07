import { toast } from 'sonner';
import axios from 'axios';
import { z } from 'zod';

import { api } from '@/api/api';

import { AuthFormSchema } from '@/schemas';

export const useAuth = () => {
  const handleAuth = async (
    type: 'login' | 'register',
    values: z.infer<typeof AuthFormSchema>,
  ) => {
    try {
      const response = await api.post(`/auth/${type}`, {
        email: values.email,
        password: values.password,
      });

      toast.success(response.data.message);
      return { success: true, data: response.data };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || `${type.toUpperCase()} failed`);
      } else {
        toast.error('An unexpected error occurred');
      }
      console.error(`${type} error:`, err);
      return { success: false, error: err };
    }
  };

  return {
    login: (values: z.infer<typeof AuthFormSchema>) => handleAuth('login', values),
    register: (values: z.infer<typeof AuthFormSchema>) => handleAuth('register', values),
  };
};
