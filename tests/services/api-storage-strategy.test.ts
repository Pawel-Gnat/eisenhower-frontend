import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockedTasks, newTask } from '../mocks/mocks';

import { ApiStorageStrategy } from '@/services/api-storage-strategy';

describe('ApiStorageStrategy', () => {
  let strategy: ApiStorageStrategy;

  beforeEach(() => {
    vi.clearAllMocks();
    strategy = new ApiStorageStrategy();
  });

  it('should get tasks from API', async () => {
    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(3);
    expect(result.object[0]).toEqual(mockedTasks[0]);
  });

  it('should add task to API', async () => {
    const result = await strategy.addTask(newTask);

    expect(result.object).toEqual(newTask);
  });

  it('should edit task from API', async () => {
    const result = await strategy.editTask('1', { title: 'New Title' });

    expect(result.object).toEqual({ ...mockedTasks[0], title: 'New Title' });
  });

  it('should delete task from API', async () => {
    const result = await strategy.deleteTask('1');

    expect(result.message).toEqual('Task deleted');
  });

  it('should delete all tasks from API', async () => {
    const result = await strategy.deleteAllTasks();

    expect(result.message).toEqual('Tasks deleted');
  });
});
