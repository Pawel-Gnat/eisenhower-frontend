import { AppContext } from '@/context/app-context';
import { useContext } from 'react';
import { MatrixColumn } from './matrix-column';

export const MatrixContainer = () => {
  const { tasks } = useContext(AppContext);

  const filteredDoTasks = tasks.filter(
    (task) => task.urgency === 'urgent' && task.importance === 'important',
  );
  const filteredScheduleTasks = tasks.filter(
    (task) => task.urgency === 'not urgent' && task.importance === 'important',
  );
  const filteredDelegateTasks = tasks.filter(
    (task) => task.urgency === 'urgent' && task.importance === 'not important',
  );
  const filteredDeleteTasks = tasks.filter(
    (task) => task.urgency === 'not urgent' && task.importance === 'not important',
  );

  return (
    <div className="relative mx-auto my-4 grid w-full max-w-screen-2xl flex-1 grid-cols-2 grid-rows-2 gap-4 overflow-y-auto">
      <MatrixColumn
        title="Do"
        description="(Urgent & Important)"
        tasks={filteredDoTasks}
      />
      <MatrixColumn
        title="Schedule"
        description="(Not Urgent & Important)"
        tasks={filteredScheduleTasks}
      />
      <MatrixColumn
        title="Delegate"
        description="(Urgent & Not Important)"
        tasks={filteredDelegateTasks}
      />
      <MatrixColumn
        title="Delete"
        description="(Not Urgent & Not Important)"
        tasks={filteredDeleteTasks}
      />
    </div>
  );
};
