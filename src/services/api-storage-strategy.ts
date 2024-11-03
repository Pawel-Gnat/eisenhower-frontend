import { StorageStrategy, Task } from '@/types';

export class ApiStorageStrategy implements StorageStrategy {
  async getTasks(): Promise<Task[]> {
    console.log('get tasks');
  }

  async addTask(task: Task): Promise<Task> {
    console.log('add task');
  }

  async editTask(taskId: string, updatedTask: Partial<Task>): Promise<Task> {
    console.log('edit task');
  }

  async deleteTask(taskId: string): Promise<void> {
    console.log('delete task');
  }
}
