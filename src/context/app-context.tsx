import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { saveToLocalStorage } from '@/helpers/local-storage';

import { Task } from '@/types';

interface AppContextProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  view: VIEW;
  setView: Dispatch<SetStateAction<VIEW>>;
}

enum VIEW {
  CREATE = 0,
  RENDER = 1,
}

export const AppContext = createContext<AppContextProps>({
  tasks: [],
  setTasks: () => {},
  view: 0,
  setView: () => {},
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem('isenhower') || '[]'),
  );
  const [view, setView] = useState<VIEW>(0);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  return (
    <AppContext.Provider value={{ tasks, setTasks, view, setView }}>
      {children}
    </AppContext.Provider>
  );
};
