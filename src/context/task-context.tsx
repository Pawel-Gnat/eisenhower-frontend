import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { StorageStrategyContext } from '@/services/storage-strategy-context';
import { StorageFactory } from '@/services/storage-factory';

import { AuthContext } from './auth-context';

import { Action, taskReducer } from '@/reducers/task-reducer';

import { PdfData, TaskState } from '@/types';

interface TaskContextProviderProps {
  children: ReactNode;
}

interface TaskContextProps extends TaskState {
  storageContext: StorageStrategyContext;
  dispatch: Dispatch<Action>;
}

export const initialPdfState: PdfData = {
  do: [],
  schedule: [],
  delegate: [],
  delete: [],
};

const initialState: TaskState = {
  tasks: [],
  view: 'create',
  pdfData: initialPdfState,
  isLoading: true,
};

export const TaskContext = createContext<TaskContextProps>({
  storageContext: new StorageStrategyContext(StorageFactory.createLocalStrategy()),
  ...initialState,
  dispatch: () => {},
});

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const { isUserLoggedIn, isLoading: isAuthLoading } = useContext(AuthContext);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const strategy = isUserLoggedIn
    ? StorageFactory.createApiStrategy()
    : StorageFactory.createLocalStrategy();

  const storageContext = useMemo(() => new StorageStrategyContext(strategy), [strategy]);

  const loadTasks = async () => {
    try {
      dispatch({ type: 'IS_LOADING', payload: { isLoading: true } });
      const response = await storageContext.getTasks();
      dispatch({ type: 'TASKS', payload: { tasks: response.object } });
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      dispatch({ type: 'IS_LOADING', payload: { isLoading: false } });
    }
  };

  useEffect(() => {
    if (isAuthLoading) return;
    loadTasks();
    dispatch({ type: 'VIEW', payload: { view: 'create' } });
  }, [isAuthLoading]);

  return (
    <TaskContext.Provider
      value={{
        ...state,
        storageContext,
        dispatch,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
