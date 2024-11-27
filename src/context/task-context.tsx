import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { StorageContext } from '@/services/storage-context';

import { AuthContext } from './auth-context';

import { Action, taskReducer } from '@/reducers/task-reducer';

import { PdfData, TaskState } from '@/types';

interface TaskContextProviderProps {
  children: ReactNode;
}

interface TaskContextProps extends TaskState {
  storageContext: StorageContext;
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
  storageContext: new StorageContext(false),
  ...initialState,
  dispatch: () => {},
});

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const { isUserLoggedIn, isLoading: isAuthLoading } = useContext(AuthContext);
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const storageContext = new StorageContext(isUserLoggedIn);

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
