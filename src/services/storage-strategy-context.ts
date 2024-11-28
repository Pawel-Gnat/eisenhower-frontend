import { ResponseFromAPI, ResponseFromAPIWithData, StorageStrategy, Task } from '@/types';

export class StorageStrategyContext {
  private strategy: StorageStrategy;

  constructor(strategy: StorageStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: StorageStrategy) {
    this.strategy = strategy;
  }

  async getTasks(): Promise<ResponseFromAPIWithData<Task[]>> {
    return this.strategy.getTasks();
  }

  async addTask(task: Task): Promise<ResponseFromAPIWithData<Task>> {
    return this.strategy.addTask(task);
  }

  async editTask(
    taskId: string,
    updatedTask: Partial<Task>,
  ): Promise<ResponseFromAPIWithData<Task>> {
    return this.strategy.editTask(taskId, updatedTask);
  }

  async deleteTask(taskId: string): Promise<ResponseFromAPI> {
    return this.strategy.deleteTask(taskId);
  }

  async deleteAllTasks(): Promise<ResponseFromAPI> {
    return this.strategy.deleteAllTasks();
  }
}
