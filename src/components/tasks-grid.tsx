import { useContext } from 'react';
import { toast } from 'sonner';

import { AppContext } from '@/context/app-context';
import { ModalContext } from '@/context/modal-context';

import { TaskCard } from './task-card';

import { Status, Task } from '@/types';

export const TasksGrid = () => {
  const { isLoading, tasks, setTasks, storageContext } = useContext(AppContext);
  const { dispatch } = useContext(ModalContext);

  const handleDeleteTask = (id: string, title: string) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        taskName: title,
        action: async () => {
          try {
            const response = await storageContext.deleteTask(id);

            if (response.status === Status.SUCCESS) {
              setTasks((prev) => prev.filter((task) => task._id !== id));
              dispatch({ type: 'CLOSE_MODAL' });
              toast(response.message);
            }
          } catch (error: unknown) {
            const errorMessage = (error as Error).message || 'Failed to delete task';
            toast.error(errorMessage);
          }
        },
      },
    });
  };

  const handleEditTask = (id: string, title: string) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: { taskName: title, taskId: id },
    });
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await storageContext.editTask(id, updates);
      setTasks((prev) => prev.map((task) => (task._id === id ? updatedTask : task)));
      toast('Task has been updated');
    } catch (error) {
      toast.error('Failed to update task');
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
            onEdit={handleEditTask}
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
