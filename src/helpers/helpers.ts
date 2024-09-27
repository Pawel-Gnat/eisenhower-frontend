import { Task } from '@/types';

export const saveToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('isenhower', JSON.stringify(tasks));
};

export const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
