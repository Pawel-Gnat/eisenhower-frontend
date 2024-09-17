import { saveToLocalStorage } from '@/helpers/local-storage';
import { Task } from '@/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface TaskContextProviderProps {
  children: ReactNode;
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  setTasks: () => {},
});

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem('isenhower') || '[]'),
  );

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>
  );
};
