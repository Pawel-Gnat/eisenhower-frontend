import { Task } from '@/types';

export const saveToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('isenhower', JSON.stringify(tasks));
};
