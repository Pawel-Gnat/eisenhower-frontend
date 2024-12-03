import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockedTasks } from '../mocks/mocks';

import { LOCAL_STORAGE_KEY } from '@/api/api';

import { LocalStorageStrategy } from '@/services/local-storage-strategy';

const getStorageSpy = vi.spyOn(Storage.prototype, 'getItem');
const setStorageSpy = vi.spyOn(Storage.prototype, 'setItem');

describe('LocalStorageStrategy', () => {
  let strategy = new LocalStorageStrategy();

  afterEach(() => {
    localStorage.clear();
    getStorageSpy.mockClear();
    setStorageSpy.mockClear();
  });

  it('should fetch tasks from localStorage', async () => {
    await strategy.getTasks();
    expect(getStorageSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
  });

  it('should add a task to localStorage', async () => {
    await strategy.addTask(mockedTasks[0]);

    expect(setStorageSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([mockedTasks[0]]),
    );
  });

  it('should edit a task in localStorage', async () => {
    await strategy.addTask(mockedTasks[0]);
    const updatedTask = { title: 'Updated Task' };

    await strategy.editTask(mockedTasks[0]._id, updatedTask);

    expect(setStorageSpy).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([{ ...mockedTasks[0], title: 'Updated Task' }]),
    );
  });

  it('should delete a task from localStorage', async () => {
    await strategy.addTask(mockedTasks[0]);
    await strategy.deleteTask(mockedTasks[0]._id);

    await strategy.getTasks();

    expect(setStorageSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([]));
  });

  it('should delete all tasks from localStorage', async () => {
    await strategy.addTask(mockedTasks[0]);
    await strategy.addTask(mockedTasks[1]);
    await strategy.addTask(mockedTasks[2]);
    await strategy.deleteAllTasks();

    await strategy.getTasks();

    expect(setStorageSpy).toHaveBeenCalledWith(LOCAL_STORAGE_KEY, JSON.stringify([]));
  });
});
