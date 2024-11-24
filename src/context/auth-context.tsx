import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '@/api/api';

import { useAuth } from '@/hooks/useAuth';

import { Status } from '@/types';

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isUserLoggedIn: boolean;
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isUserLoggedIn: false,
  isLoading: true,
  handleLogin: async () => false,
  handleLogout: async () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { login } = useAuth();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const result = await login({ email, password });

    if (result.success) {
      setIsUserLoggedIn(true);
    }

    setIsLoading(false);
    return result.success;
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await api.get('/auth/logout');
      setIsUserLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsUserLoggedIn = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/validate');

      if (response.data.status === Status.SUCCESS) {
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.error('Validate error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        isLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
