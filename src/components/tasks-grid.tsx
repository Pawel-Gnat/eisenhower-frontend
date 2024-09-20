import { AppContext } from '@/context/app-context';
import { TaskCard } from './task-card';
import { useContext } from 'react';
import { Task } from '@/types';

export const TasksGrid = () => {
  const { tasks, setTasks } = useContext(AppContext);

  const handleTaskDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleTaskSelectOption = <K extends keyof Task>(
    id: string,
    field: K,
    value: Task[K],
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, [field]: value } : task)),
    );
  };

  return (
    <div className="scrollbar-custom mx-auto my-4 grid w-full max-w-screen-2xl flex-1 grid-cols-auto-fill grid-rows-auto-fill gap-4 overflow-y-auto rounded-xl border-2 border-dashed p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            onDelete={handleTaskDelete}
            onSelectOption={handleTaskSelectOption}
            {...task}
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
