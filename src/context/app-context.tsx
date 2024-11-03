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
  storageContext: new StorageContext(false),
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<VIEW>(0);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);

  const isAuthenticated = false;
  const storageContext = new StorageContext(isAuthenticated);

  useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await storageContext.getTasks();
      setTasks(initialTasks);
    };
    loadTasks();
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{ tasks, setTasks, view, setView, pdfData, setPdfData, storageContext }}
    >
      {children}
    </AppContext.Provider>
  );
};
