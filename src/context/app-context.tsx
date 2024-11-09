import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { api } from '@/api/api';

import { useAuth } from '@/hooks/useAuth';

import { StorageContext } from '@/services/storage-context';

import { PdfData, Task } from '@/types';

interface AppContextProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  view: VIEW;
  setView: Dispatch<SetStateAction<VIEW>>;
  pdfData: PdfData;
  setPdfData: Dispatch<SetStateAction<PdfData>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  storageContext: StorageContext;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => void;
}

enum VIEW {
  CREATE = 0,
  RENDER = 1,
}

const initialPdfState: PdfData = {
  do: [],
  schedule: [],
  delegate: [],
  delete: [],
};

export const AppContext = createContext<AppContextProps>({
  tasks: [],
  setTasks: () => {},
  view: 0,
  setView: () => {},
  pdfData: initialPdfState,
  setPdfData: () => {},
  isAuthenticated: false,
  isLoading: true,
  setIsLoading: () => {},
  storageContext: new StorageContext(false),
  handleLogin: async () => false,
  handleLogout: async () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<VIEW>(VIEW.CREATE);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const storageContext = new StorageContext(isAuthenticated);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const result = await login({ email, password });

    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('eisenhower-token', result.data.token);
    }

    setIsLoading(false);
    return result.success;
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await api.post('/auth/logout');
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const initialTasks = await storageContext.getTasks();
        setTasks(initialTasks);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        view,
        setView,
        pdfData,
        setPdfData,
        storageContext,
        isAuthenticated,
        isLoading,
        setIsLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
