import { LocalStorageStrategy } from './local-storage-strategy';
import { ApiStorageStrategy } from './api-storage-strategy';

import { StorageStrategy, Task } from '@/types';

export class StorageContext {
  private strategy: StorageStrategy;

  constructor(isAuthenticated: boolean) {
    this.strategy = isAuthenticated
      ? new ApiStorageStrategy()
      : new LocalStorageStrategy();
  }

  setStrategy(isAuthenticated: boolean) {
    this.strategy = isAuthenticated
      ? new ApiStorageStrategy()
      : new LocalStorageStrategy();
  }

  async getTasks() {
    return this.strategy.getTasks();
  }

  async addTask(task: Task) {
    return this.strategy.addTask(task);
  }

  async editTask(taskId: string, updatedTask: Partial<Task>) {
    return this.strategy.editTask(taskId, updatedTask);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.strategy.deleteTask(taskId);
  }
}
