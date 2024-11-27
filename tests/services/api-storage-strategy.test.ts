import { beforeEach, describe, expect, it, vi, Mock } from 'vitest';
import axios from 'axios';

import { mockedTasks } from '../mocks/mocks';

import { api } from '@/api/api';

import { ApiStorageStrategy } from '@/services/api-storage-strategy';

import { Task } from '@/types';

// vi.mock('axios');

// vi.mock('@/api/api', () => {
//   const mockedApi = vi.mocked(api);

//   return {
//     api: mockedApi,
//   };
// });

describe('ApiStorageStrategy', () => {
  const task: Task = {
    _id: '1',
    title: 'Test Task 1',
    urgency: 'urgent',
    importance: 'important',
  };
  let strategy: ApiStorageStrategy;

  beforeEach(() => {
    vi.clearAllMocks();
    strategy = new ApiStorageStrategy();
  });

  it('should fetch tasks from API', async () => {
    vi.spyOn(api, 'get').mockResolvedValue({
      data: mockedTasks,
    });

    const result = await strategy.getTasks();

    expect(result.object).toHaveLength(3);
    expect(result.object[0]).toEqual(mockedTasks[0]);
  });
});
