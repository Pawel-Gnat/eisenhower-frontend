import { Task } from '@/types';

export const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const initializeSortedTasks = (tasks: Task[]) =>
  tasks.map((task, index) => ({
    ...task,
    order: index + 1,
  }));
