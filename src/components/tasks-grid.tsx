import { useContext } from 'react';
import { toast } from 'sonner';

import { TaskContext } from '@/context/task-context';
import { ModalContext } from '@/context/modal-context';

import { TaskCard } from './task-card';

import { Status, Task } from '@/types';

export const TasksGrid = () => {
  const {
    isLoading,
    tasks,
    storageContext,
    dispatch: taskDispatch,
  } = useContext(TaskContext);
  const { dispatch: modalDispatch } = useContext(ModalContext);

  const handleDeleteTask = (id: string, title: string) => {
    modalDispatch({
      type: 'DELETE_TASK',
      payload: {
        taskName: title,
        action: async () => {
          try {
            const response = await storageContext.deleteTask(id);

            if (response.status === Status.SUCCESS) {
              taskDispatch({
                type: 'TASKS',
                payload: { tasks: tasks.filter((task) => task._id !== id) },
              });
              modalDispatch({ type: 'CLOSE_MODAL' });
              toast.success(response.message);
            }
          } catch (error: unknown) {
            const errorMessage = (error as Error).message || 'Failed to delete task';
            toast.error(errorMessage);
          }
        },
      },
    });
  };

  const handleTaskNameChange = (id: string, title: string) => {
    modalDispatch({
      type: 'EDIT_TASK',
      payload: { taskName: title, taskId: id },
    });
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await storageContext.editTask(id, updates);

      if (response.status === Status.SUCCESS) {
        taskDispatch({
          type: 'TASKS',
          payload: {
            tasks: tasks.map((task) => (task._id === id ? response.object : task)),
          },
        });
        toast.success(response.message);
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || 'Failed to update task';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="scrollbar-custom mx-auto my-4 grid w-full max-w-screen-2xl flex-1 grid-cols-auto-fill grid-rows-auto-fill gap-4 overflow-y-auto rounded-xl border-2 border-dashed p-4">
      {isLoading ? (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Loading...
        </p>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            {...task}
            onDelete={handleDeleteTask}
            onEdit={handleTaskNameChange}
            onUpdateTask={handleUpdateTask}
          />
        ))
      ) : (
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          Please add at least few tasks
        </p>
      )}
    </div>
  );
};
