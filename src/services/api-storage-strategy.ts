import axios from 'axios';

import { api } from '@/api/api';

import {
  ResponseError,
  ResponseFromAPI,
  ResponseFromAPIWithData,
  StorageStrategy,
  Task,
} from '@/types';

export class ApiStorageStrategy implements StorageStrategy {
  private handleError(operation: string, err: unknown): ResponseError {
    let errorMessage = 'An unexpected error occurred';

    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.error || `Failed to ${operation}`;
    }

    console.error(`${operation} error:`, err);
    throw { message: errorMessage, error: err };
  }

  async getTasks(): Promise<ResponseFromAPIWithData<Task[]>> {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (err) {
      this.handleError('fetch tasks', err);
      throw err;
    }
  }

  async addTask(task: Task): Promise<ResponseFromAPIWithData<Task>> {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (err) {
      this.handleError('add task', err);
      throw err;
    }
  }

  async editTask(
    taskId: string,
    updatedTask: Partial<Task>,
  ): Promise<ResponseFromAPIWithData<Task>> {
    try {
      const response = await api.patch(`/tasks/${taskId}`, updatedTask);
      return response.data;
    } catch (err) {
      this.handleError('update task', err);
      throw err;
    }
  }

  async deleteTask(taskId: string): Promise<ResponseFromAPI> {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (err) {
      this.handleError('delete task', err);
      throw err;
    }
  }

  async deleteAllTasks(): Promise<ResponseFromAPI> {
    try {
      const response = await api.delete(`/tasks`);
      return response.data;
    } catch (err) {
      this.handleError('delete tasks', err);
      throw err;
    }
  }
}
