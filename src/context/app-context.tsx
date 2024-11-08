import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

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
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  storageContext: StorageContext;
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
  setIsAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  storageContext: new StorageContext(false),
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<VIEW>(VIEW.CREATE);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const storageContext = new StorageContext(isAuthenticated);

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
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
