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

import { PdfData, Status, Task } from '@/types';

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
  isUserLoggedIn: boolean;
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
  isUserLoggedIn: false,
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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { login } = useAuth();
  const storageContext = new StorageContext(isUserLoggedIn);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const result = await login({ email, password });

    if (result.success) {
      storageContext.setStrategy(true);
      setView(VIEW.CREATE);
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
      storageContext.setStrategy(false);
      setView(VIEW.CREATE);
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

  useEffect(() => {
    loadTasks();
  }, [isUserLoggedIn]);

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
        isUserLoggedIn,
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
