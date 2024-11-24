import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { StorageContext } from '@/services/storage-context';

import { PdfData, Task } from '@/types';
import { AuthContext } from './auth-context';

interface TaskContextProviderProps {
  children: ReactNode;
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  view: VIEW;
  setView: Dispatch<SetStateAction<VIEW>>;
  pdfData: PdfData;
  setPdfData: Dispatch<SetStateAction<PdfData>>;
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

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => {},
  view: 0,
  setView: () => {},
  pdfData: initialPdfState,
  setPdfData: () => {},
  isLoading: true,
  setIsLoading: () => {},
  storageContext: new StorageContext(false),
});

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const { isUserLoggedIn, isLoading: isAuthLoading } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<VIEW>(VIEW.CREATE);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const storageContext = new StorageContext(isUserLoggedIn);

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
    if (isAuthLoading) return;
    storageContext.setStrategy(isUserLoggedIn);
    loadTasks();
    setView(VIEW.CREATE);
  }, [isUserLoggedIn, isAuthLoading]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        view,
        setView,
        pdfData,
        setPdfData,
        storageContext,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
