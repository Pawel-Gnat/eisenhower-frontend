import { StorageStrategy, Task } from '@/types';

export class LocalStorageStrategy implements StorageStrategy {
  private readonly STORAGE_KEY = 'isenhower';

  private saveToLocalStorage(tasks: Task[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  async getTasks(): Promise<Task[]> {
    const tasks = localStorage.getItem(this.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  async addTask(task: Task): Promise<Task> {
    const tasks = await this.getTasks();
    tasks.push(task);
    this.saveToLocalStorage(tasks);
    return task;
  }

  async editTask(taskId: string, updatedTask: Partial<Task>): Promise<Task> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task,
    );

    this.saveToLocalStorage(updatedTasks);
    return updatedTasks[taskIndex];
  }

  async deleteTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    this.saveToLocalStorage(updatedTasks);
  }
}
