import { ResponseFromAPIWithData, Status, StorageStrategy, Task } from '@/types';

export class LocalStorageStrategy implements StorageStrategy {
  private readonly STORAGE_KEY = 'isenhower';

  private saveToLocalStorage(tasks: Task[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  async getTasks(): Promise<ResponseFromAPIWithData<Task[]>> {
    const tasks = localStorage.getItem(this.STORAGE_KEY);

    return {
      message: 'Task loaded',
      object: tasks ? JSON.parse(tasks) : [],
      httpStatus: 201,
      status: Status.SUCCESS,
    };
  }

  async addTask(task: Task): Promise<ResponseFromAPIWithData<Task>> {
    const response = await this.getTasks();
    const tasks = response.object;
    tasks.push(task);
    this.saveToLocalStorage(tasks);

    return {
      message: 'Task created',
      object: task,
      httpStatus: 201,
      status: Status.SUCCESS,
    };
  }

  async editTask(taskId: string, updatedTask: Partial<Task>): Promise<Task> {
    const response = await this.getTasks();
    const tasks = response.object;
    const taskIndex = tasks.findIndex((task) => task._id === taskId);

    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, ...updatedTask } : task,
    );

    this.saveToLocalStorage(updatedTasks);
    return updatedTasks[taskIndex];
  }

  async deleteTask(taskId: string): Promise<void> {
    const response = await this.getTasks();
    const tasks = response.object;
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    this.saveToLocalStorage(updatedTasks);
  }
}
