import { Task } from '@/types';

export const mockedTasks: Task[] = [
  {
    _id: '1',
    title: 'Test Task 1',
    urgency: 'urgent',
    importance: 'important',
  },
  {
    _id: '2',
    title: 'Test Task 2',
    urgency: 'urgent',
    importance: 'important',
  },
  {
    _id: '3',
    title: 'Test Task 3',
    urgency: 'urgent',
    importance: 'important',
  },
];

export const newTask: Task = {
  _id: '4',
  title: 'Test Task 4',
  urgency: null,
  importance: null,
};
