import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { saveToLocalStorage } from '@/helpers/local-storage';

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
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem('isenhower') || '[]'),
  );
  const [view, setView] = useState<VIEW>(0);
  const [pdfData, setPdfData] = useState<PdfData>(initialPdfState);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  return (
    <AppContext.Provider value={{ tasks, setTasks, view, setView, pdfData, setPdfData }}>
      {children}
    </AppContext.Provider>
  );
};
