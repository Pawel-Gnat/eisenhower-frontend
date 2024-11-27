import { beforeEach, describe, expect, it } from 'vitest';

import { mockedTasks } from '../mocks/mocks';

import { LocalStorageStrategy } from '@/services/local-storage-strategy';

import { Task } from '@/types';

describe('LocalStorageStrategy', () => {
  const task: Task = {
    _id: '1',
    title: 'Test Task 1',
    urgency: 'urgent',
    importance: 'important',
  };
  let strategy: LocalStorageStrategy;

  beforeEach(() => {
    strategy = new LocalStorageStrategy();
    localStorage.clear();
  });

  it('should fetch tasks from localStorage', async () => {
    localStorage.setItem('eisenhower', JSON.stringify(mockedTasks));

    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(3);
    expect(result.object[0]).toEqual(mockedTasks[0]);
  });

  it('should add a task to localStorage', async () => {
    await strategy.addTask(task);

    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(1);
    expect(result.object[0]).toEqual(task);
  });

  it('should edit a task in localStorage', async () => {
    await strategy.addTask(task);
    const updatedTask = { title: 'Updated Task' };

    await strategy.editTask(task._id, updatedTask);
    const result = await strategy.getTasks();

    expect(result.object[0].title).toBe('Updated Task');
  });

  it('should delete a task from localStorage', async () => {
    await strategy.addTask(task);
    await strategy.deleteTask(task._id);

    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(0);
  });

  it('should delete all tasks from localStorage', async () => {
    await strategy.addTask(task);
    await strategy.deleteAllTasks();

    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(0);
  });
});
