import { http, HttpResponse } from 'msw';

import { API_URL } from '@/api/api';

import { mockedTasks } from './mocks';
import { ResponseFromAPI, ResponseFromAPIWithData, Status, Task } from '@/types';

const serverHandlers = [
  http.get<{}, Task, ResponseFromAPIWithData<Task[]>>(`${API_URL}/tasks`, async () => {
    return HttpResponse.json({
      object: mockedTasks,
      httpStatus: 200,
      message: 'Tasks loaded',
      status: Status.SUCCESS,
    });
  }),

  http.post<{}, Task, ResponseFromAPIWithData<Task>>(
    `${API_URL}/tasks`,
    async ({ request }) => {
      const { _id, title, urgency, importance } = await request.json();

      const newTask = {
        _id,
        title,
        urgency,
        importance,
      };

      return HttpResponse.json({
        object: newTask,
        httpStatus: 201,
        message: 'Task created',
        status: Status.SUCCESS,
      });
    },
  ),

  http.patch<{ taskId: string }, Task, ResponseFromAPIWithData<Task>>(
    `${API_URL}/tasks/:taskId`,
    async ({ request, params }) => {
      const updates = await request.json();
      const { taskId } = params;

      const task = mockedTasks.find((task) => task._id === taskId);
      const editedTask = { ...task, ...updates };

      return HttpResponse.json({
        object: editedTask,
        httpStatus: 200,
        message: 'Task updated',
        status: Status.SUCCESS,
      });
    },
  ),

  http.delete<{ taskId: string }, {}, ResponseFromAPI>(
    `${API_URL}/tasks/:taskId`,
    async ({ params }) => {
      const { taskId } = params;

      mockedTasks.filter((task) => task._id !== taskId);

      return HttpResponse.json({
        httpStatus: 200,
        message: 'Task deleted',
        status: Status.SUCCESS,
      });
    },
  ),

  http.delete<{}, {}, ResponseFromAPI>(`${API_URL}/tasks`, async () => {
    return HttpResponse.json({
      httpStatus: 200,
      message: 'Tasks deleted',
      status: Status.SUCCESS,
    });
  }),
];

export { serverHandlers };
