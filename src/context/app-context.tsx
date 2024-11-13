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
  userToken: string | null;
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
  userToken: null,
  isLoading: true,
  setIsLoading: () => {},
  storageContext: new StorageContext(null),
  handleLogin: async () => false,
  handleLogout: async () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<VIEW>(VIEW.CREATE);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('eisenhower-token'),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { login } = useAuth();
  const storageContext = new StorageContext(userToken);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const result = await login({ email, password });

    if (result.success) {
      const token = result.data.token;
      setUserToken(token);
      storageContext.setStrategy(token);
      setView(VIEW.CREATE);
      localStorage.setItem('eisenhower-token', token);
    }

    setIsLoading(false);
    return result.success;
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await api.get('/auth/logout');
      setUserToken('');
      storageContext.setStrategy('');
      setView(VIEW.CREATE);
      localStorage.removeItem('eisenhower-token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await storageContext.getTasks();
      setTasks(response.object);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [userToken]);

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
        userToken,
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
